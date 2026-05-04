import type { SkillKey } from "./skills";

export interface QuickStartItem {
  key: SkillKey;
  time: { en: string; zh: string };
  hook: { en: string; zh: string };
  command: string;
}

export const quickStartItems: QuickStartItem[] = [
  {
    key: "12-inference-serving/ollama",
    time: { en: "2 min", zh: "2 分钟" },
    hook: {
      en: "Run Llama 3, Mistral, or Qwen on your laptop with one command — no GPU required.",
      zh: "一条命令在笔记本上跑 Llama 3 / Mistral / Qwen，不需要 GPU。",
    },
    command: "ollama run llama3",
  },
  {
    key: "18-multimodal/whisper",
    time: { en: "5 min", zh: "5 分钟" },
    hook: {
      en: "Transcribe any audio file to text in 99 languages, with built-in translation.",
      zh: "把任何音频转成 99 种语言的文字，自带翻译。",
    },
    command: "pip install openai-whisper && whisper audio.mp3",
  },
  {
    key: "15-rag/chroma",
    time: { en: "5 min", zh: "5 分钟" },
    hook: {
      en: "Spin up a local vector database for RAG. No infra, no cloud account, no API keys.",
      zh: "本地起一个向量数据库做 RAG，不用部署、不用云账号、不用 API key。",
    },
    command: "pip install chromadb",
  },
  {
    key: "15-rag/sentence-transformers",
    time: { en: "5 min", zh: "5 分钟" },
    hook: {
      en: "Build semantic search with state-of-the-art embeddings in three lines of Python.",
      zh: "三行 Python 用顶尖嵌入模型做语义搜索。",
    },
    command: "pip install sentence-transformers",
  },
  {
    key: "16-prompt-engineering/instructor",
    time: { en: "5 min", zh: "5 分钟" },
    hook: {
      en: "Get reliable structured JSON out of any LLM using Pydantic schemas.",
      zh: "用 Pydantic 模式从任何 LLM 拿到稳定的结构化 JSON。",
    },
    command: "pip install instructor",
  },
  {
    key: "12-inference-serving/llama-cpp",
    time: { en: "10 min", zh: "10 分钟" },
    hook: {
      en: "Run quantized LLMs on CPU, Mac Metal, or any GPU — same binary, anywhere.",
      zh: "在 CPU / Mac Metal / 任意 GPU 上跑量化 LLM，同一个二进制随地跑。",
    },
    command: "pip install llama-cpp-python",
  },
];
