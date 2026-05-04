import type { SkillKey } from "./skills";

export interface UseCase {
  id: string;
  emoji: string;
  goal: { en: string; zh: string };
  detail: { en: string; zh: string };
  picks: { key: SkillKey; reason: { en: string; zh: string } }[];
}

export const useCases: UseCase[] = [
  {
    id: "chat-with-docs",
    emoji: "💬",
    goal: {
      en: "Chat with my own files (PDFs, notes, docs)",
      zh: "用我自己的文件（PDF、笔记、文档）做问答",
    },
    detail: {
      en: "Drop in a folder, ask questions in plain English, get answers grounded in your actual content.",
      zh: "丢进一个文件夹，用大白话提问，AI 基于你的真实内容回答。",
    },
    picks: [
      {
        key: "15-rag/chroma",
        reason: {
          en: "The local 'memory' that stores your docs",
          zh: "存放文档的本地「记忆库」",
        },
      },
      {
        key: "15-rag/sentence-transformers",
        reason: {
          en: "Turns text into searchable vectors",
          zh: "把文字变成可搜索的向量",
        },
      },
      {
        key: "14-agents/langchain",
        reason: {
          en: "Glues it all together into a Q&A app",
          zh: "把各部分组装成问答应用",
        },
      },
    ],
  },
  {
    id: "run-locally",
    emoji: "💻",
    goal: {
      en: "Run AI privately on my own laptop",
      zh: "在自己的笔记本上离线跑 AI",
    },
    detail: {
      en: "No cloud, no API keys, no monthly bills. Your data never leaves your machine.",
      zh: "不用云端、不用 API key、不用月费。数据完全留在本机。",
    },
    picks: [
      {
        key: "12-inference-serving/ollama",
        reason: {
          en: "Easiest way: one command, model running",
          zh: "最简单：一条命令模型就跑起来",
        },
      },
      {
        key: "12-inference-serving/llama-cpp",
        reason: {
          en: "Works on CPU, Mac Metal, and any GPU",
          zh: "支持 CPU、Mac Metal、任意 GPU",
        },
      },
      {
        key: "10-optimization/gguf-quantization",
        reason: {
          en: "Shrinks big models to laptop-friendly size",
          zh: "把大模型压到笔记本能跑的大小",
        },
      },
    ],
  },
  {
    id: "speech-to-text",
    emoji: "🎙️",
    goal: {
      en: "Turn audio or podcasts into text",
      zh: "把音频或播客转成文字",
    },
    detail: {
      en: "Transcribe meetings, lectures, voice memos in 99 languages. Optionally translate to English.",
      zh: "转录会议、讲座、语音备忘，支持 99 种语言，还能翻成英文。",
    },
    picks: [
      {
        key: "18-multimodal/whisper",
        reason: {
          en: "OpenAI's gold standard, runs offline",
          zh: "OpenAI 的标杆模型，可离线运行",
        },
      },
    ],
  },
  {
    id: "generate-images",
    emoji: "🎨",
    goal: {
      en: "Generate images from text descriptions",
      zh: "用文字描述生成图片",
    },
    detail: {
      en: "Type a description, get an image. Free, runs locally on a decent GPU, no usage limits.",
      zh: "打几行文字，得到图片。免费、有 GPU 就能本地跑、没有用量限制。",
    },
    picks: [
      {
        key: "18-multimodal/stable-diffusion-image-generation",
        reason: {
          en: "The most popular open-source image generator",
          zh: "最流行的开源图片生成模型",
        },
      },
    ],
  },
  {
    id: "structured-output",
    emoji: "📊",
    goal: {
      en: "Get reliable structured data (JSON) out of AI",
      zh: "从 AI 拿到稳定的结构化数据（JSON）",
    },
    detail: {
      en: "Stop fighting with AI replies that 'almost' look like JSON. Define a schema, get exactly that shape every time.",
      zh: "别再跟 AI「看起来像 JSON」的回复较劲。定义好结构，每次都能拿到精确的格式。",
    },
    picks: [
      {
        key: "16-prompt-engineering/instructor",
        reason: {
          en: "Define schemas in Python with Pydantic",
          zh: "用 Pydantic 在 Python 里定义结构",
        },
      },
      {
        key: "16-prompt-engineering/outlines",
        reason: {
          en: "Constrain output to JSON, regex, or grammar",
          zh: "把输出强制约束成 JSON、正则或语法",
        },
      },
    ],
  },
  {
    id: "build-agent",
    emoji: "🤖",
    goal: {
      en: "Build an AI agent that takes actions for me",
      zh: "做一个能帮我执行任务的 AI 助手",
    },
    detail: {
      en: "An agent reads a goal, decides what to do, calls tools, and reports back — like a tireless intern.",
      zh: "助手读懂目标、自己决定做什么、调用工具、再回报结果——像一个不知疲倦的实习生。",
    },
    picks: [
      {
        key: "14-agents/langchain",
        reason: {
          en: "Most popular, biggest community, easiest to start",
          zh: "最流行、社区最大、最容易上手",
        },
      },
      {
        key: "14-agents/crewai-multi-agent",
        reason: {
          en: "When you want multiple agents with different roles",
          zh: "想让多个不同角色的助手协作时",
        },
      },
    ],
  },
];
