"use client";

import { useEffect, useRef, useState } from "react";

export type VoiceDemoState =
  | "idle"
  | "permission"
  | "listening"
  | "thinking"
  | "speaking"
  | "error";

type RecognitionAlternative = { transcript?: string };
type RecognitionResultList = ArrayLike<ArrayLike<RecognitionAlternative>>;
type RecognitionEvent = Event & {
  error?: string;
  results?: RecognitionResultList;
};

type RecognitionLike = EventTarget & {
  lang: string;
  interimResults: boolean;
  continuous: boolean;
  start(): void;
  stop(): void;
  abort(): void;
};

type RecognitionCtor = new () => RecognitionLike;
type BrowserWindow = Window & {
  SpeechRecognition?: RecognitionCtor;
  webkitSpeechRecognition?: RecognitionCtor;
};

const STATUS_TEXT: Record<VoiceDemoState, string> = {
  idle: "체험 시작하기를 누르면 브라우저가 마이크 권한을 확인합니다.",
  permission: "권한 확인 중...",
  listening: "듣고 있어요...",
  thinking: "생각 중...",
  speaking: "응답을 들려주는 중...",
  error: "음성 체험을 이어갈 수 없습니다.",
};

function getRecognitionConstructor() {
  if (typeof window === "undefined") {
    return null;
  }

  const browserWindow = window as BrowserWindow;

  return browserWindow.SpeechRecognition ?? browserWindow.webkitSpeechRecognition ?? null;
}

function buildDemoReply(transcript: string) {
  const normalized = transcript.trim();

  if (!normalized) {
    return "음성을 다시 한번 들려주시면 Velora Voice의 응답 흐름을 바로 이어서 보여드릴게요.";
  }

  if (normalized.includes("정확")) {
    return "Velora Voice는 인식 결과를 빠르게 정리하고, 고객이 바로 품질을 체감할 수 있는 흐름으로 보여줍니다.";
  }

  if (normalized.includes("속도") || normalized.includes("빠르")) {
    return "질문이 끝난 뒤 기다림이 길지 않도록, 응답 전환 속도를 실제 제품 경험처럼 짧게 설계했습니다.";
  }

  if (normalized.includes("환경") || normalized.includes("어디")) {
    return "상담, 키오스크, 내부 업무 지원처럼 실시간 음성 안내가 필요한 장면에 바로 연결할 수 있습니다.";
  }

  return `방금 들은 내용은 "${normalized}" 입니다. 이 데모는 음성 입력과 응답 재생이 한 흐름으로 이어지는 모습을 보여줍니다.`;
}

function readTranscript(event: RecognitionEvent) {
  return Array.from(event.results ?? [])
    .map((result) => result?.[0]?.transcript ?? "")
    .join(" ")
    .trim();
}

function humanizeRecognitionError(error?: string) {
  if (error === "not-allowed" || error === "service-not-allowed") {
    return "마이크 권한이 필요합니다. 브라우저 설정에서 마이크를 허용해주세요.";
  }

  if (error === "no-speech") {
    return "음성이 들리지 않았습니다. 다시 한번 말씀해주세요.";
  }

  return "음성 체험을 다시 시작해주세요.";
}

export function useVoiceDemo() {
  const [state, setState] = useState<VoiceDemoState>("idle");
  const [transcript, setTranscript] = useState("");
  const [reply, setReply] = useState("");
  const [error, setError] = useState("");
  const recognitionRef = useRef<RecognitionLike | null>(null);
  const replyTimerRef = useRef<number | null>(null);
  const stateRef = useRef<VoiceDemoState>("idle");

  const setTrackedState = (nextState: VoiceDemoState) => {
    stateRef.current = nextState;
    setState(nextState);
  };

  const clearReplyTimer = () => {
    if (replyTimerRef.current !== null) {
      window.clearTimeout(replyTimerRef.current);
      replyTimerRef.current = null;
    }
  };

  const cancelSpeech = () => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      return;
    }

    window.speechSynthesis.cancel();
  };

  const stop = () => {
    clearReplyTimer();
    recognitionRef.current?.abort();
    recognitionRef.current = null;
    cancelSpeech();
    setTrackedState("idle");
  };

  const speakReply = (nextReply: string) => {
    if (
      typeof window === "undefined" ||
      !("speechSynthesis" in window) ||
      typeof window.SpeechSynthesisUtterance === "undefined"
    ) {
      setTrackedState("idle");
      return;
    }

    setTrackedState("speaking");

    const utterance = new window.SpeechSynthesisUtterance(nextReply);
    utterance.lang = "ko-KR";
    utterance.onend = () => {
      if (stateRef.current === "speaking") {
        setTrackedState("idle");
      }
    };

    cancelSpeech();
    window.speechSynthesis.speak(utterance);
  };

  const start = () => {
    if (stateRef.current !== "idle" && stateRef.current !== "error") {
      return;
    }

    const Recognition = getRecognitionConstructor();

    if (!Recognition) {
      setError("이 브라우저는 음성 체험을 지원하지 않습니다. 최신 Chrome 또는 Safari를 권장합니다.");
      setTrackedState("error");
      return;
    }

    clearReplyTimer();
    cancelSpeech();
    setTranscript("");
    setReply("");
    setError("");
    setTrackedState("permission");

    const recognition = new Recognition();
    recognition.lang = "ko-KR";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.addEventListener("start", () => {
      setTrackedState("listening");
    });

    recognition.addEventListener("result", (event) => {
      const nextTranscript = readTranscript(event as RecognitionEvent);

      if (!nextTranscript) {
        return;
      }

      const nextReply = buildDemoReply(nextTranscript);

      setTranscript(nextTranscript);
      setReply(nextReply);
      setTrackedState("thinking");
      clearReplyTimer();
      replyTimerRef.current = window.setTimeout(() => {
        speakReply(nextReply);
      }, 240);
    });

    recognition.addEventListener("error", (event) => {
      setError(humanizeRecognitionError((event as RecognitionEvent).error));
      setTrackedState("error");
    });

    recognition.addEventListener("end", () => {
      if (stateRef.current === "listening" || stateRef.current === "permission") {
        setTrackedState("idle");
      }
    });

    recognitionRef.current = recognition;
    recognition.start();
  };

  useEffect(() => {
    return () => {
      clearReplyTimer();
      recognitionRef.current?.abort();
      recognitionRef.current = null;
      cancelSpeech();
    };
  }, []);

  return {
    error,
    reply,
    start,
    state,
    statusText: error && state === "error" ? error : STATUS_TEXT[state],
    stop,
    transcript,
  };
}
