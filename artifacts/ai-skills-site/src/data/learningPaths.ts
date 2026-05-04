import type { SkillKey } from "./skills";

export interface LearningPath {
  id: string;
  name: { en: string; zh: string };
  desc: { en: string; zh: string };
  color: string;
  icon: string;
  skills: SkillKey[];
}

export const learningPaths: LearningPath[] = [
  {
    id: "zero-to-production",
    name: {
      en: "Zero to Production",
      zh: "从零到上线",
    },
    desc: {
      en: "Train a model from scratch, fine-tune it, optimize it, and deploy it as a serving endpoint.",
      zh: "从零训练模型、微调、优化、部署上线，端到端跑通整条流水线。",
    },
    color: "#6366F1",
    icon: "rocket",
    skills: [
      "01-model-architecture/nanogpt",
      "03-fine-tuning/peft-fine-tuning",
      "06-post-training/fine-tuning-with-trl",
      "06-post-training/grpo-rl-training",
      "10-optimization/awq-quantization",
      "12-inference-serving/serving-llms-vllm",
      "13-mlops/weights-and-biases",
    ],
  },
  {
    id: "multimodal-mastery",
    name: {
      en: "Multimodal Mastery",
      zh: "多模态精通",
    },
    desc: {
      en: "Vision, language, audio, and segmentation — master the full multimodal stack.",
      zh: "视觉、语言、音频、分割——一次性掌握完整多模态技术栈。",
    },
    color: "#F59E0B",
    icon: "image",
    skills: [
      "18-multimodal/clip",
      "18-multimodal/blip-2-vision-language",
      "18-multimodal/llava",
      "18-multimodal/segment-anything-model",
      "18-multimodal/stable-diffusion-image-generation",
      "18-multimodal/audiocraft-audio-generation",
      "18-multimodal/evaluating-cosmos-policy",
    ],
  },
  {
    id: "inference-optimization",
    name: {
      en: "Inference Optimization",
      zh: "LLM 推理优化",
    },
    desc: {
      en: "Squeeze the last drop of throughput: attention kernels, quantization, speculation, serving.",
      zh: "榨干每一滴推理性能：注意力内核、量化、投机解码、生产级服务。",
    },
    color: "#34D399",
    icon: "zap",
    skills: [
      "10-optimization/optimizing-attention-flash",
      "10-optimization/quantizing-models-bitsandbytes",
      "10-optimization/awq-quantization",
      "10-optimization/gptq",
      "10-optimization/gguf-quantization",
      "19-emerging-techniques/speculative-decoding",
      "12-inference-serving/serving-llms-vllm",
      "12-inference-serving/sglang",
      "12-inference-serving/tensorrt-llm",
    ],
  },
  {
    id: "rl-for-llms",
    name: {
      en: "RL for LLMs",
      zh: "LLM 强化学习",
    },
    desc: {
      en: "From PPO to GRPO to Constitutional AI — modern post-training with reinforcement learning.",
      zh: "从 PPO 到 GRPO 再到 Constitutional AI，现代 LLM 后训练的强化学习全套打法。",
    },
    color: "#A855F7",
    icon: "activity",
    skills: [
      "06-post-training/fine-tuning-with-trl",
      "06-post-training/openrlhf-training",
      "06-post-training/grpo-rl-training",
      "06-post-training/simpo-training",
      "06-post-training/verl-rl-training",
      "07-safety-alignment/constitutional-ai",
    ],
  },
  {
    id: "architecture-innovation",
    name: {
      en: "Architecture Innovation",
      zh: "架构创新",
    },
    desc: {
      en: "Beyond Transformers: explore Mamba, RWKV, MoE, and long-context architectures.",
      zh: "超越 Transformer：探索 Mamba、RWKV、MoE 与长上下文架构创新。",
    },
    color: "#22D3EE",
    icon: "cpu",
    skills: [
      "01-model-architecture/nanogpt",
      "01-model-architecture/implementing-llms-litgpt",
      "01-model-architecture/mamba-architecture",
      "01-model-architecture/rwkv-architecture",
      "19-emerging-techniques/moe-training",
      "19-emerging-techniques/long-context",
    ],
  },
];
