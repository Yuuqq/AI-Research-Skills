export const categories = [
  { slug: "01-model-architecture", label: "Model Architecture", color: "#6366F1", count: 5, desc: "LitGPT, Mamba, RWKV, NanoGPT, TorchTitan", icon: "cpu",
    skills: [
      { slug: "implementing-llms-litgpt", name: "LitGPT", desc: "Lightweight LLM training using Lightning AI. Supports 20+ architectures.", tags: ["LitGPT", "Training"], deps: ["litgpt", "torch"] },
      { slug: "mamba-architecture", name: "Mamba", desc: "State Space Model for linear-time sequence modeling, challenging Transformer dominance.", tags: ["Mamba", "SSM"], deps: ["mamba-ssm", "torch"] },
      { slug: "nanogpt", name: "NanoGPT", desc: "Minimal GPT implementation for research by Andrej Karpathy.", tags: ["NanoGPT", "Training"], deps: ["torch", "numpy"] },
      { slug: "rwkv-architecture", name: "RWKV", desc: "RNN-Transformer hybrid with linear attention, combining RNN efficiency with Transformer expressivity.", tags: ["RWKV", "Linear Attention"], deps: ["rwkv", "torch"] },
      { slug: "distributed-llm-pretraining-torchtitan", name: "TorchTitan", desc: "PyTorch-native distributed LLM pretraining with FSDP2 and tensor parallelism.", tags: ["TorchTitan", "Distributed"], deps: ["torchtitan", "torch"] }
    ]
  },
  { slug: "02-tokenization", label: "Tokenization", color: "#818CF8", count: 2, desc: "HuggingFace Tokenizers, SentencePiece", icon: "type",
    skills: [
      { slug: "huggingface-tokenizers", name: "HuggingFace Tokenizers", desc: "Fast Rust-based tokenizers with BPE, WordPiece, and Unigram.", tags: ["Tokenization", "BPE"], deps: ["tokenizers"] },
      { slug: "sentencepiece", name: "SentencePiece", desc: "Google's language-independent subword tokenizer used in T5, LLaMA, Gemma.", tags: ["Tokenization", "Google"], deps: ["sentencepiece"] }
    ]
  },
  { slug: "03-fine-tuning", label: "Fine-Tuning", color: "#A855F7", count: 4, desc: "Axolotl, LLaMA-Factory, Unsloth, PEFT", icon: "zap",
    skills: [
      { slug: "axolotl", name: "Axolotl", desc: "Streamlined fine-tuning with YAML config. LoRA, QLoRA, full fine-tune support.", tags: ["LoRA", "QLoRA"], deps: ["axolotl", "torch"] },
      { slug: "llama-factory", name: "LLaMA Factory", desc: "One-stop fine-tuning for 100+ LLMs with SFT, DPO, ORPO, and KTO.", tags: ["SFT", "DPO"], deps: ["llamafactory"] },
      { slug: "peft-fine-tuning", name: "PEFT", desc: "Parameter-Efficient Fine-Tuning: LoRA, QLoRA, Prefix Tuning, IA3.", tags: ["PEFT", "LoRA", "HuggingFace"], deps: ["peft", "transformers"] },
      { slug: "unsloth", name: "Unsloth", desc: "2x faster fine-tuning with 70% less VRAM. Custom CUDA kernels.", tags: ["Fast Training", "Memory Efficient"], deps: ["unsloth", "torch"] }
    ]
  },
  { slug: "04-mechanistic-interpretability", label: "Mechanistic Interpretability", color: "#C084FC", count: 4, desc: "TransformerLens, SAELens, NNsight, Pyvene", icon: "search",
    skills: [
      { slug: "nnsight-remote-interpretability", name: "NNsight", desc: "Remote model intervention with simple Python API on NNsight.net cluster.", tags: ["Interpretability", "Interventions"], deps: ["nnsight"] },
      { slug: "pyvene-interventions", name: "Pyvene", desc: "Causal intervention library for PyTorch models. Distributed alignment search.", tags: ["Causal", "Interventions"], deps: ["pyvene", "torch"] },
      { slug: "sparse-autoencoder-training", name: "SAELens", desc: "Train Sparse Autoencoders for mechanistic interpretability of LLM internals.", tags: ["SAE", "Interpretability"], deps: ["sae-lens"] },
      { slug: "transformer-lens-interpretability", name: "TransformerLens", desc: "Hook points, residual stream analysis, activation patching for mechanistic interp.", tags: ["TransformerLens", "Hooks"], deps: ["transformer-lens"] }
    ]
  },
  { slug: "05-data-processing", label: "Data Processing", color: "#22D3EE", count: 2, desc: "Ray Data, NeMo Curator", icon: "database",
    skills: [
      { slug: "nemo-curator", name: "NeMo Curator", desc: "NVIDIA GPU-accelerated data curation for pretraining. Dedup, filtering, quality scoring.", tags: ["NeMo", "NVIDIA", "GPU"], deps: ["nemo-curator"] },
      { slug: "ray-data", name: "Ray Data", desc: "Distributed data processing for ML. Lazy evaluation, streaming, GPU transforms.", tags: ["Ray", "Distributed"], deps: ["ray[data]"] }
    ]
  },
  { slug: "06-post-training", label: "Post-Training", color: "#34D399", count: 8, desc: "TRL, GRPO, OpenRLHF, SimPO, verl, slime, miles, torchforge", icon: "activity",
    skills: [
      { slug: "grpo-rl-training", name: "GRPO", desc: "Group Relative Policy Optimization — efficient RLHF without a critic model.", tags: ["GRPO", "RL"], deps: ["trl"] },
      { slug: "miles-rl-training", name: "Miles", desc: "Multi-step interleaved learning for RL post-training.", tags: ["Miles", "RL"], deps: ["miles"] },
      { slug: "openrlhf-training", name: "OpenRLHF", desc: "Scalable RLHF framework: PPO, DPO, GRPO. Supports 70B+ models.", tags: ["RLHF", "PPO", "Scalable"], deps: ["openrlhf"] },
      { slug: "simpo-training", name: "SimPO", desc: "Reference-free DPO variant with length-normalized rewards.", tags: ["SimPO", "Preference Learning"], deps: ["trl"] },
      { slug: "slime-rl-training", name: "Slime", desc: "Scalable language model RL training with efficient rollout.", tags: ["RL", "Scalable"], deps: ["slime"] },
      { slug: "torchforge-rl-training", name: "TorchForge", desc: "PyTorch-native RL training with modular reward and rollout components.", tags: ["RL", "PyTorch"], deps: ["torchforge"] },
      { slug: "fine-tuning-with-trl", name: "TRL", desc: "HuggingFace's Transformer RL library: SFT, DPO, PPO, GRPO, ORPO.", tags: ["TRL", "HuggingFace", "RLHF"], deps: ["trl", "peft"] },
      { slug: "verl-rl-training", name: "verl", desc: "Volcano Engine RL framework for large-scale post-training with hybrid parallelism.", tags: ["verl", "Hybrid Parallelism"], deps: ["verl"] }
    ]
  },
  { slug: "07-safety-alignment", label: "Safety & Alignment", color: "#F43F5E", count: 4, desc: "Constitutional AI, LlamaGuard, NeMo Guardrails, Prompt Guard", icon: "shield",
    skills: [
      { slug: "constitutional-ai", name: "Constitutional AI", desc: "Anthropic's CAI: train safe AI using a constitution with RL from AI feedback.", tags: ["Safety", "RLAIF", "Anthropic"], deps: ["anthropic"] },
      { slug: "llamaguard", name: "LlamaGuard", desc: "Meta's LLM-based safety classifier for detecting harmful content.", tags: ["Safety", "Classification", "Meta"], deps: ["transformers"] },
      { slug: "nemo-guardrails", name: "NeMo Guardrails", desc: "Programmable guardrails for LLM apps using Colang.", tags: ["Guardrails", "NVIDIA"], deps: ["nemoguardrails"] },
      { slug: "prompt-guard", name: "Prompt Guard", desc: "Meta's model for detecting prompt injection and jailbreak attempts.", tags: ["Safety", "Prompt Injection"], deps: ["transformers"] }
    ]
  },
  { slug: "08-distributed-training", label: "Distributed Training", color: "#6366F1", count: 6, desc: "Megatron, DeepSpeed, FSDP, Accelerate, PyTorch Lightning, Ray Train", icon: "layers",
    skills: [
      { slug: "huggingface-accelerate", name: "Accelerate", desc: "Simple wrapper for distributed training across GPUs, TPUs, and mixed precision.", tags: ["Distributed", "HuggingFace"], deps: ["accelerate"] },
      { slug: "deepspeed", name: "DeepSpeed", desc: "ZeRO-1/2/3, pipeline parallelism, Infinity offload. Microsoft's deep learning optimizer.", tags: ["DeepSpeed", "ZeRO", "Microsoft"], deps: ["deepspeed"] },
      { slug: "training-llms-megatron", name: "Megatron-LM", desc: "NVIDIA's tensor, pipeline, and sequence parallelism. Used to train GPT-4, Falcon.", tags: ["Megatron", "Tensor Parallelism", "NVIDIA"], deps: ["megatron-core"] },
      { slug: "pytorch-fsdp2", name: "PyTorch FSDP2", desc: "Fully Sharded Data Parallel v2 with improved composability and torch.compile.", tags: ["FSDP", "PyTorch"], deps: ["torch>=2.4"] },
      { slug: "pytorch-lightning", name: "PyTorch Lightning", desc: "High-level training framework with distributed, mixed precision, and checkpointing.", tags: ["Lightning", "PyTorch"], deps: ["lightning"] },
      { slug: "ray-train", name: "Ray Train", desc: "Distributed training with Ray — scale to any cloud cluster.", tags: ["Ray", "Distributed"], deps: ["ray[train]"] }
    ]
  },
  { slug: "09-infrastructure", label: "Infrastructure", color: "#818CF8", count: 3, desc: "Modal, SkyPilot, Lambda Labs", icon: "server",
    skills: [
      { slug: "lambda-labs-gpu-cloud", name: "Lambda Labs", desc: "Affordable GPU cloud: on-demand H100, A100, RTX instances.", tags: ["GPU Cloud", "Lambda"], deps: ["boto3"] },
      { slug: "modal-serverless-gpu", name: "Modal", desc: "Serverless GPU platform — run Python on H100s in seconds, pay per second.", tags: ["Modal", "Serverless"], deps: ["modal"] },
      { slug: "skypilot-multi-cloud-orchestration", name: "SkyPilot", desc: "Run LLM workloads across AWS, GCP, Azure with auto spot recovery.", tags: ["SkyPilot", "Multi-Cloud"], deps: ["skypilot"] }
    ]
  },
  { slug: "10-optimization", label: "Optimization", color: "#F59E0B", count: 7, desc: "Flash Attention, bitsandbytes, GPTQ, AWQ, HQQ, GGUF, Recipes", icon: "trending-up",
    skills: [
      { slug: "awq-quantization", name: "AWQ", desc: "Activation-Aware Weight Quantization — 4-bit preserving salient weights.", tags: ["Quantization", "4-bit"], deps: ["autoawq"] },
      { slug: "quantizing-models-bitsandbytes", name: "bitsandbytes", desc: "8-bit and 4-bit quantization enabling LLM fine-tuning on consumer GPUs.", tags: ["Quantization", "4-bit"], deps: ["bitsandbytes"] },
      { slug: "optimizing-attention-flash", name: "Flash Attention", desc: "IO-aware exact attention: 2-8x speedup, linear memory. Required for long context.", tags: ["Flash Attention", "Speed"], deps: ["flash-attn"] },
      { slug: "gguf-quantization", name: "GGUF", desc: "llama.cpp's quantization format for CPU/GPU inference. 2-8 bit quants.", tags: ["GGUF", "Quantization"], deps: ["llama-cpp-python"] },
      { slug: "gptq", name: "GPTQ", desc: "Post-training quantization using Hessian information. 3-4 bit minimal accuracy loss.", tags: ["GPTQ", "Quantization"], deps: ["auto-gptq"] },
      { slug: "hqq-quantization", name: "HQQ", desc: "Calibration-free quantization — runs anywhere without calibration data.", tags: ["HQQ", "Calibration-Free"], deps: ["hqq"] },
      { slug: "ml-training-recipes", name: "ML Training Recipes", desc: "Battle-tested recipes for stable training: warmup, gradient clipping, LR strategies.", tags: ["Recipes", "Training"], deps: ["torch"] }
    ]
  },
  { slug: "11-evaluation", label: "Evaluation", color: "#22D3EE", count: 3, desc: "lm-evaluation-harness, BigCode, NeMo Evaluator", icon: "bar-chart",
    skills: [
      { slug: "evaluating-code-models", name: "BigCode Evaluation", desc: "Evaluate code LLMs on HumanEval, MBPP, DS-1000, 50+ coding benchmarks.", tags: ["Evaluation", "Code"], deps: ["bigcode-evaluation-harness"] },
      { slug: "evaluating-llms-harness", name: "LM Eval Harness", desc: "EleutherAI's framework for 200+ benchmarks: MMLU, ARC, HellaSwag, GSM8K.", tags: ["Evaluation", "Benchmarks"], deps: ["lm-eval"] },
      { slug: "nemo-evaluator-sdk", name: "NeMo Evaluator", desc: "NVIDIA NeMo evaluation SDK for running benchmarks at scale.", tags: ["NeMo", "Evaluation"], deps: ["nemo-toolkit"] }
    ]
  },
  { slug: "12-inference-serving", label: "Inference & Serving", color: "#34D399", count: 5, desc: "vLLM, TensorRT-LLM, llama.cpp, SGLang, Ollama", icon: "zap",
    skills: [
      { slug: "llama-cpp", name: "llama.cpp", desc: "C++ LLM inference with GGUF. CPU-first, Metal, CUDA. Runs on laptops.", tags: ["CPU", "GGUF"], deps: ["llama-cpp-python"] },
      { slug: "ollama", name: "Ollama", desc: "Run 100+ LLMs locally with zero config. OpenAI-compatible REST API.", tags: ["Local LLMs", "OpenAI Compatible"], deps: ["ollama"] },
      { slug: "sglang", name: "SGLang", desc: "RadixAttention KV cache — 5x faster than vLLM on multi-call workloads.", tags: ["Serving", "KV Cache"], deps: ["sglang"] },
      { slug: "tensorrt-llm", name: "TensorRT-LLM", desc: "NVIDIA's optimized inference: FP8, speculative decoding. Best H100 throughput.", tags: ["TensorRT", "NVIDIA", "FP8"], deps: ["tensorrt-llm"] },
      { slug: "serving-llms-vllm", name: "vLLM", desc: "PagedAttention — 24x throughput vs HuggingFace. Production standard.", tags: ["PagedAttention", "Production"], deps: ["vllm"] }
    ]
  },
  { slug: "13-mlops", label: "MLOps", color: "#A855F7", count: 4, desc: "W&B, MLflow, TensorBoard, SwanLab", icon: "git-branch",
    skills: [
      { slug: "mlflow", name: "MLflow", desc: "Open-source MLOps: experiment tracking, model registry, deployment.", tags: ["MLflow", "Tracking"], deps: ["mlflow"] },
      { slug: "experiment-tracking-swanlab", name: "SwanLab", desc: "Lightweight tracking with beautiful UI, offline mode, team collaboration.", tags: ["SwanLab", "Visualization"], deps: ["swanlab"] },
      { slug: "tensorboard", name: "TensorBoard", desc: "Visualization toolkit for training metrics, embeddings, model graphs.", tags: ["TensorBoard", "Google"], deps: ["tensorboard"] },
      { slug: "weights-and-biases", name: "Weights & Biases", desc: "Industry-standard ML tracking with sweeps, artifacts, team collaboration.", tags: ["W&B", "Sweeps"], deps: ["wandb"] }
    ]
  },
  { slug: "14-agents", label: "Agents", color: "#6366F1", count: 6, desc: "LangChain, LlamaIndex, CrewAI, AutoGPT, A-Evolve, OpenHands", icon: "cpu",
    skills: [
      { slug: "evolving-ai-agents", name: "A-Evolve", desc: "Evolutionary approach to AI agent design — self-improving via evolutionary algorithms.", tags: ["Evolutionary", "Self-Improvement"], deps: ["torch"] },
      { slug: "autogpt-agents", name: "AutoGPT", desc: "Autonomous GPT-4 agent that chains tasks, browses web, writes and executes code.", tags: ["AutoGPT", "Autonomous"], deps: ["autogpt"] },
      { slug: "crewai-multi-agent", name: "CrewAI", desc: "Multi-agent orchestration with roles, task delegation, sequential/parallel workflows.", tags: ["Multi-Agent", "CrewAI"], deps: ["crewai"] },
      { slug: "langchain", name: "LangChain", desc: "Most popular LLM framework. ReAct agents, RAG pipelines, 500+ integrations.", tags: ["Agents", "RAG", "LangChain"], deps: ["langchain"] },
      { slug: "llamaindex", name: "LlamaIndex", desc: "Data framework for LLM apps. Best for RAG over complex documents and knowledge graphs.", tags: ["RAG", "Knowledge Graph"], deps: ["llama-index"] },
      { slug: "openhands", name: "OpenHands", desc: "Autonomous AI software engineer that writes code, runs experiments, manages GitHub repos.", tags: ["Autonomous Coding", "OpenHands"], deps: ["openhands-ai"] }
    ]
  },
  { slug: "15-rag", label: "RAG", color: "#818CF8", count: 6, desc: "Chroma, FAISS, Pinecone, Qdrant, Sentence Transformers, Haystack", icon: "search",
    skills: [
      { slug: "chroma", name: "Chroma", desc: "Open-source embedding database for RAG. Built-in embeddings, metadata filtering.", tags: ["Chroma", "Vector DB"], deps: ["chromadb"] },
      { slug: "faiss", name: "FAISS", desc: "Facebook AI's billion-scale similarity search. GPU-accelerated, HNSW, IVF.", tags: ["FAISS", "GPU"], deps: ["faiss-cpu"] },
      { slug: "haystack", name: "Haystack", desc: "Production NLP framework for search pipelines and RAG with 100+ integrations.", tags: ["Haystack", "Pipelines"], deps: ["haystack-ai"] },
      { slug: "pinecone", name: "Pinecone", desc: "Managed vector database for production RAG with hybrid search.", tags: ["Pinecone", "Managed"], deps: ["pinecone-client"] },
      { slug: "qdrant-vector-search", name: "Qdrant", desc: "High-performance vector search in Rust. Payload filtering, named vectors.", tags: ["Qdrant", "Rust"], deps: ["qdrant-client"] },
      { slug: "sentence-transformers", name: "Sentence Transformers", desc: "State-of-the-art sentence embeddings for semantic search. 10,000+ models.", tags: ["Embeddings", "Semantic Search"], deps: ["sentence-transformers"] }
    ]
  },
  { slug: "16-prompt-engineering", label: "Prompt Engineering", color: "#C084FC", count: 4, desc: "DSPy, Instructor, Guidance, Outlines", icon: "message-square",
    skills: [
      { slug: "dspy", name: "DSPy", desc: "Declarative Self-improving Python — optimize prompts and weights automatically.", tags: ["DSPy", "Optimization"], deps: ["dspy-ai"] },
      { slug: "guidance", name: "Guidance", desc: "Microsoft's constrained generation — interleave code and LLM with exact control.", tags: ["Constrained Generation", "Microsoft"], deps: ["guidance"] },
      { slug: "instructor", name: "Instructor", desc: "Structured output extraction using Pydantic. Retry logic, streaming, multi-provider.", tags: ["Structured Output", "Pydantic"], deps: ["instructor"] },
      { slug: "outlines", name: "Outlines", desc: "Fast structured generation — constrain LLM to JSON schema, regex, or grammar.", tags: ["Structured Generation"], deps: ["outlines"] }
    ]
  },
  { slug: "17-observability", label: "Observability", color: "#22D3EE", count: 2, desc: "LangSmith, Phoenix", icon: "eye",
    skills: [
      { slug: "langsmith-observability", name: "LangSmith", desc: "LangChain's LLM observability: trace, debug, evaluate, and monitor apps.", tags: ["LangSmith", "Tracing"], deps: ["langsmith"] },
      { slug: "phoenix-observability", name: "Phoenix", desc: "Arize AI's open-source LLM observability — traces, evals, dataset curation.", tags: ["Phoenix", "Arize"], deps: ["arize-phoenix"] }
    ]
  },
  { slug: "18-multimodal", label: "Multimodal", color: "#F59E0B", count: 10, desc: "CLIP, Whisper, LLaVA, Stable Diffusion, SAM, BLIP-2, AudioCraft, OpenPI, OpenVLA-OFT, Cosmos", icon: "image",
    skills: [
      { slug: "audiocraft-audio-generation", name: "AudioCraft", desc: "Meta's audio generation: MusicGen for music, AudioGen for sounds.", tags: ["Audio", "MusicGen", "Meta"], deps: ["audiocraft"] },
      { slug: "blip-2-vision-language", name: "BLIP-2", desc: "Salesforce's vision-language model for image Q&A with Q-Former bridge.", tags: ["Vision-Language", "Salesforce"], deps: ["transformers"] },
      { slug: "clip", name: "CLIP", desc: "OpenAI's contrastive image-text model. Zero-shot classification, image search.", tags: ["CLIP", "OpenAI", "Vision"], deps: ["clip", "torch"] },
      { slug: "evaluating-cosmos-policy", name: "Cosmos Policy", desc: "NVIDIA's world foundation model for robot learning and physical AI.", tags: ["Robotics", "Physical AI", "NVIDIA"], deps: ["cosmos"] },
      { slug: "llava", name: "LLaVA", desc: "Large Language and Vision Assistant for multimodal conversations.", tags: ["LLaVA", "Vision-Language"], deps: ["transformers"] },
      { slug: "openpi", name: "OpenPI", desc: "Fine-tune and serve Physical Intelligence's pi0 / pi0-fast / pi0.5 robot policies on ALOHA, DROID, and LIBERO.", tags: ["Robotics", "VLA", "JAX", "PyTorch"], deps: ["openpi", "jax", "torch"] },
      { slug: "openvla-oft", name: "OpenVLA-OFT", desc: "LoRA fine-tuning of OpenVLA with continuous action heads (L1 / diffusion) and FiLM conditioning for LIBERO and ALOHA.", tags: ["Robotics", "VLA", "LoRA", "Action Chunking"], deps: ["torch", "peft", "transformers"] },
      { slug: "segment-anything-model", name: "SAM", desc: "Meta's zero-shot image segmentation — any object, any image.", tags: ["SAM", "Segmentation", "Meta"], deps: ["segment-anything"] },
      { slug: "stable-diffusion-image-generation", name: "Stable Diffusion", desc: "Open-source text-to-image. Diffusers, ControlNet, LoRA fine-tuning, SDXL.", tags: ["Stable Diffusion", "Image Generation"], deps: ["diffusers"] },
      { slug: "whisper", name: "Whisper", desc: "OpenAI's robust multilingual speech recognition. 99 languages, transcription, translation, six model sizes.", tags: ["Whisper", "ASR", "OpenAI", "Multilingual"], deps: ["openai-whisper"] }
    ]
  },
  { slug: "19-emerging-techniques", label: "Emerging Techniques", color: "#F43F5E", count: 7, desc: "MoE, model merging, long context, speculative decoding, distillation, pruning, Mergekit", icon: "trending-up",
    skills: [
      { slug: "knowledge-distillation", name: "Knowledge Distillation", desc: "Compress large teachers into smaller students via soft targets and DPO distillation.", tags: ["Distillation", "Compression"], deps: ["transformers"] },
      { slug: "long-context", name: "Long Context", desc: "Extend context windows: RoPE scaling, YaRN, LongLoRA strategies.", tags: ["Long Context", "RoPE"], deps: ["transformers"] },
      { slug: "mergekit", name: "Mergekit", desc: "Merge fine-tuned models without GPU. SLERP, TIES, DARE, Task Arithmetic, Frankenmerge.", tags: ["Model Merging", "SLERP", "TIES", "DARE"], deps: ["mergekit"] },
      { slug: "model-merging", name: "Model Merging", desc: "Combine specialists into generalists via weight interpolation and task vectors.", tags: ["Model Merging", "Task Vectors"], deps: ["transformers"] },
      { slug: "model-pruning", name: "Model Pruning", desc: "Structured/unstructured pruning: SparseGPT, Wanda, magnitude pruning.", tags: ["Pruning", "SparseGPT"], deps: ["transformers"] },
      { slug: "moe-training", name: "MoE Training", desc: "Mixture of Experts with expert parallelism, load balancing, router training.", tags: ["MoE", "Experts"], deps: ["torch"] },
      { slug: "speculative-decoding", name: "Speculative Decoding", desc: "Speed up inference 2-3x using a draft model verified by the main model.", tags: ["Speculative Decoding", "Speed"], deps: ["transformers"] }
    ]
  },
  { slug: "20-ml-paper-writing", label: "ML Paper Writing", color: "#34D399", count: 4, desc: "LaTeX for NeurIPS, ICML, ICLR, ACL, AAAI", icon: "file-text",
    skills: [
      { slug: "academic-plotting", name: "Academic Plotting", desc: "Publication-quality figures with matplotlib. Error bars, significance, color palettes.", tags: ["Plotting", "Matplotlib"], deps: ["matplotlib", "seaborn"] },
      { slug: "ml-paper-writing", name: "ML Paper Writing", desc: "End-to-end guide: structure, related work, experiments, LaTeX templates.", tags: ["Paper Writing", "LaTeX", "NeurIPS"], deps: ["latex"] },
      { slug: "presenting-conference-talks", name: "Conference Talks", desc: "Craft compelling research talks: narrative arc, slides, live demos, Q&A.", tags: ["Talks", "Presentations"], deps: [] },
      { slug: "systems-paper-writing", name: "Systems Papers", desc: "Writing MLSys/OSDI papers: evaluation rigor, microbenchmarks, ablations.", tags: ["Systems", "MLSys"], deps: ["latex"] }
    ]
  },
  { slug: "21-research-ideation", label: "Research Ideation", color: "#6366F1", count: 2, desc: "Brainstorming and creative thinking for AI research", icon: "lightbulb",
    skills: [
      { slug: "brainstorming-research-ideas", name: "Brainstorming", desc: "Systematic methods for generating novel AI research ideas: literature gaps, analogies.", tags: ["Ideation", "Research"], deps: [] },
      { slug: "creative-thinking-for-research", name: "Creative Thinking", desc: "Lateral thinking, SCAMPER, morphological analysis for hypothesis generation.", tags: ["Creative Thinking", "Hypothesis"], deps: [] }
    ]
  },
  { slug: "0-autoresearch-skill", label: "Autoresearch", color: "#F59E0B", count: 1, desc: "Autonomous end-to-end AI research orchestration", icon: "brain",
    skills: [
      { slug: "autoresearch", name: "Autoresearch", desc: "Two-loop autonomous research orchestration: inner loop for rapid experiments, outer loop for synthesis.", tags: ["Orchestration", "Autonomous", "Two-Loop"], deps: ["all domain skills"] }
    ]
  }
] as const;

export const totalSkills = categories.reduce((sum, c) => sum + c.skills.length, 0);
export const totalCategories = categories.length;

type CategoryEntry = (typeof categories)[number];
type SkillEntry<C extends CategoryEntry = CategoryEntry> = C["skills"][number];

export type SkillKey = {
  [C in CategoryEntry as C["slug"]]: `${C["slug"]}/${SkillEntry<C>["slug"]}`;
}[CategoryEntry["slug"]];
