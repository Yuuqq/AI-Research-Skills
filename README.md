# AI Research Skills Library

> **A comprehensive open-source skills library enabling AI agents to autonomously conduct AI research — from idea to paper. 99 skills across 22 categories.**

<p align="center">
  <a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="License: MIT"></a>
  <a href="https://github.com/qcmuu/AI-Research-Skills"><img src="https://img.shields.io/badge/GitHub-Repo-blue.svg?logo=github" alt="GitHub"></a>
</p>

---

## Table of Contents

- [What Are AI Research Skills](#what-are-ai-research-skills)
- [Available Skills (99 Total)](#available-skills-99-total)
- [Skill Structure](#skill-structure)
- [Quick Start](#quick-start)
- [Use Cases](#use-cases)
- [Repository Structure](#repository-structure)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgments](#acknowledgments)

## What Are AI Research Skills

Each skill is a self-contained package of expert-level guidance (200-500 lines) with real code examples, troubleshooting guides, and production-ready workflows. Skills are designed to be consumed by AI coding agents (Claude Code, Cursor, OpenCode, etc.) to give them deep expertise in specific AI research tools and frameworks.

The library covers the full AI research lifecycle:

- **Ideation** → Brainstorm research ideas with structured frameworks
- **Architecture** → Design and understand model architectures
- **Data** → Curate, tokenize, and process training datasets
- **Training** → Fine-tune, distributed train, and post-train (RLHF/DPO/GRPO)
- **Optimization** → Quantize, prune, distill, and optimize models
- **Evaluation** → Benchmark with standard and custom harnesses
- **Serving** → Deploy with vLLM, TensorRT-LLM, llama.cpp, SGLang, Ollama
- **Agents & RAG** → Build agentic and retrieval-augmented systems
- **Multimodal** → Work with vision, audio, and robotics models
- **Paper Writing** → Write, plot, and present your research

The **Autoresearch** skill orchestrates the entire lifecycle autonomously, routing to domain skills as needed.

## Available Skills (99 Total)

| Category | # | Skills |
|----------|---|--------|
| **Autoresearch** | 1 | Autonomous research orchestration |
| **Model Architecture** | 5 | LitGPT, Mamba, NanoGPT, RWKV, TorchTitan |
| **Tokenization** | 2 | HuggingFace Tokenizers, SentencePiece |
| **Fine-Tuning** | 4 | Axolotl, LLaMA-Factory, PEFT, Unsloth |
| **Mech Interp** | 4 | TransformerLens, SAELens, pyvene, nnsight |
| **Data Processing** | 2 | Ray Data, NeMo Curator |
| **Post-Training** | 8 | TRL, GRPO, OpenRLHF, SimPO, verl, slime, miles, torchforge |
| **Safety** | 4 | Constitutional AI, LlamaGuard, NeMo Guardrails, Prompt Guard |
| **Distributed** | 6 | Megatron-Core, DeepSpeed, FSDP, Accelerate, Lightning, Ray Train |
| **Infrastructure** | 3 | Modal, SkyPilot, Lambda Labs |
| **Optimization** | 7 | Flash Attention, bitsandbytes, GPTQ, AWQ, HQQ, GGUF, ML Training Recipes |
| **Evaluation** | 3 | lm-eval-harness, BigCode, NeMo Evaluator |
| **Inference** | 5 | vLLM, TensorRT-LLM, llama.cpp, SGLang, Ollama |
| **MLOps** | 4 | W&B, MLflow, TensorBoard, SwanLab |
| **Agents** | 6 | LangChain, LlamaIndex, CrewAI, AutoGPT, A-Evolve, OpenHands |
| **RAG** | 6 | Chroma, FAISS, Sentence Transformers, Pinecone, Qdrant, Haystack |
| **Prompt Eng** | 4 | DSPy, Instructor, Guidance, Outlines |
| **Observability** | 2 | LangSmith, Phoenix |
| **Multimodal** | 10 | CLIP, Whisper, LLaVA, Stable Diffusion, SAM, BLIP-2, AudioCraft, Cosmos-Policy, OpenPI, OpenVLA-OFT |
| **Emerging** | 7 | MoE, Model Merging, Long Context, Speculative Decoding, Distillation, Pruning, Mergekit |
| **Paper Writing** | 4 | ML Paper Writing, Academic Plotting, Conference Talks, Systems Paper Writing |
| **Ideation** | 2 | Research Brainstorming, Creative Thinking |

<details>
<summary><b>View All 99 Skills with Details</b></summary>

### Autoresearch (1 skill)
- **[Autoresearch](0-autoresearch-skill/)** - Autonomous research orchestration using a two-loop architecture (inner optimization + outer synthesis). Manages the full lifecycle from literature survey to paper writing, routing to all domain-specific skills.

### Model Architecture (5 skills)
- **[LitGPT](01-model-architecture/litgpt/)** - Lightning AI's 20+ clean LLM implementations with production training recipes
- **[Mamba](01-model-architecture/mamba/)** - State-space models with O(n) complexity, 5x faster than Transformers
- **[RWKV](01-model-architecture/rwkv/)** - RNN+Transformer hybrid, infinite context, Linux Foundation project
- **[NanoGPT](01-model-architecture/nanogpt/)** - Educational GPT in ~300 lines by Karpathy
- **[TorchTitan](01-model-architecture/torchtitan/)** - PyTorch-native distributed training for Llama 3.1 with 4D parallelism

### Tokenization (2 skills)
- **[HuggingFace Tokenizers](02-tokenization/huggingface-tokenizers/)** - Rust-based, <20s/GB, BPE/WordPiece/Unigram algorithms
- **[SentencePiece](02-tokenization/sentencepiece/)** - Language-independent, 50k sentences/sec, used by T5/ALBERT

### Fine-Tuning (4 skills)
- **[Axolotl](03-fine-tuning/axolotl/)** - YAML-based fine-tuning with 100+ models
- **[LLaMA-Factory](03-fine-tuning/llama-factory/)** - WebUI no-code fine-tuning
- **[Unsloth](03-fine-tuning/unsloth/)** - 2x faster QLoRA fine-tuning
- **[PEFT](03-fine-tuning/peft/)** - Parameter-efficient fine-tuning with LoRA, QLoRA, DoRA, 25+ methods

### Mechanistic Interpretability (4 skills)
- **[TransformerLens](04-mechanistic-interpretability/transformer-lens/)** - HookPoints, activation caching, circuit analysis
- **[SAELens](04-mechanistic-interpretability/saelens/)** - Sparse Autoencoder training and analysis for feature discovery
- **[pyvene](04-mechanistic-interpretability/pyvene/)** - Stanford's causal intervention library with declarative configs
- **[nnsight](04-mechanistic-interpretability/nnsight/)** - Remote interpretability via NDIF, run experiments on 70B+ models

### Data Processing (2 skills)
- **[Ray Data](05-data-processing/ray-data/)** - Distributed ML data processing, streaming execution, GPU support
- **[NeMo Curator](05-data-processing/nemo-curator/)** - GPU-accelerated data curation, 16x faster deduplication

### Post-Training (8 skills)
- **[TRL Fine-Tuning](06-post-training/trl-fine-tuning/)** - Transformer Reinforcement Learning
- **[GRPO-RL-Training](06-post-training/grpo-rl-training/)** - Group Relative Policy Optimization with TRL
- **[OpenRLHF](06-post-training/openrlhf/)** - Full RLHF pipeline with Ray + vLLM
- **[SimPO](06-post-training/simpo/)** - Simple Preference Optimization, no reference model needed
- **[verl](06-post-training/verl/)** - ByteDance's HybridFlow RL framework, FSDP/Megatron + vLLM/SGLang backends
- **[slime](06-post-training/slime/)** - THUDM's Megatron+SGLang framework powering GLM-4.x models
- **[miles](06-post-training/miles/)** - Enterprise fork of slime with FP8, INT4, speculative RL for MoE training
- **[torchforge](06-post-training/torchforge/)** - Meta's PyTorch-native RL with Monarch+TorchTitan+vLLM

### Safety & Alignment (4 skills)
- **[Constitutional AI](07-safety-alignment/constitutional-ai/)** - AI-driven self-improvement via principles
- **[LlamaGuard](07-safety-alignment/llamaguard/)** - Safety classifier for LLM inputs/outputs
- **[NeMo Guardrails](07-safety-alignment/nemo-guardrails/)** - Programmable guardrails with Colang
- **[Prompt Guard](07-safety-alignment/prompt-guard/)** - Meta's 86M prompt injection & jailbreak detector, 99%+ TPR, <2ms GPU

### Distributed Training (6 skills)
- **[Megatron-Core](08-distributed-training/megatron-core/)** - NVIDIA's framework for training 2B-462B param models with 47% MFU on H100
- **[DeepSpeed](08-distributed-training/deepspeed/)** - Microsoft's ZeRO optimization
- **[PyTorch FSDP2](08-distributed-training/pytorch-fsdp2/)** - Fully Sharded Data Parallel v2 with `fully_shard` and DTensor
- **[Accelerate](08-distributed-training/accelerate/)** - HuggingFace's 4-line distributed training API
- **[PyTorch Lightning](08-distributed-training/pytorch-lightning/)** - High-level training framework with Trainer class
- **[Ray Train](08-distributed-training/ray-train/)** - Multi-node orchestration and hyperparameter tuning

### Infrastructure (3 skills)
- **[Modal](09-infrastructure/modal/)** - Serverless GPU cloud with Python-native API, T4-H200 on-demand
- **[SkyPilot](09-infrastructure/skypilot/)** - Multi-cloud orchestration across 20+ providers with spot recovery
- **[Lambda Labs](09-infrastructure/lambda-labs/)** - Reserved/on-demand GPU cloud with H100/A100

### Optimization (7 skills)
- **[Flash Attention](10-optimization/flash-attention/)** - 2-4x faster attention with memory efficiency
- **[bitsandbytes](10-optimization/bitsandbytes/)** - 8-bit/4-bit quantization for 50-75% memory reduction
- **[GPTQ](10-optimization/gptq/)** - 4-bit post-training quantization, <2% accuracy loss
- **[AWQ](10-optimization/awq/)** - Activation-aware weight quantization, 4-bit with minimal accuracy loss
- **[HQQ](10-optimization/hqq/)** - Half-Quadratic Quantization, no calibration data needed
- **[GGUF](10-optimization/gguf/)** - llama.cpp quantization format, K-quant methods, CPU/Metal inference
- **[ML Training Recipes](10-optimization/ml-training-recipes/)** - Production training recipes and best practices

### Evaluation (3 skills)
- **[lm-evaluation-harness](11-evaluation/lm-evaluation-harness/)** - EleutherAI's standard for benchmarking LLMs across 60+ tasks
- **[BigCode Evaluation Harness](11-evaluation/bigcode-evaluation-harness/)** - Code model benchmarking with HumanEval, MBPP, MultiPL-E
- **[NeMo Evaluator](11-evaluation/nemo-evaluator/)** - NVIDIA's enterprise platform for 100+ benchmarks across 18+ harnesses

### Inference & Serving (5 skills)
- **[vLLM](12-inference-serving/vllm/)** - High-throughput LLM serving with PagedAttention
- **[TensorRT-LLM](12-inference-serving/tensorrt-llm/)** - NVIDIA's fastest inference, 24k tok/s, FP8/INT4 quantization
- **[llama.cpp](12-inference-serving/llama-cpp/)** - CPU/Apple Silicon inference, GGUF quantization
- **[SGLang](12-inference-serving/sglang/)** - Structured generation with RadixAttention, 5-10x faster for agents
- **[Ollama](12-inference-serving/ollama/)** - Run LLMs locally with one command, multi-modal support

### MLOps (4 skills)
- **[Weights & Biases](13-mlops/weights-and-biases/)** - Experiment tracking, sweeps, artifacts, model registry
- **[MLflow](13-mlops/mlflow/)** - Model registry, tracking, deployment, autologging
- **[TensorBoard](13-mlops/tensorboard/)** - Visualization, profiling, embeddings, scalars/images
- **[SwanLab](13-mlops/swanlab/)** - Experiment tracking and visualization

### Agents (6 skills)
- **[LangChain](14-agents/langchain/)** - Most popular agent framework, 500+ integrations, ReAct pattern
- **[LlamaIndex](14-agents/llamaindex/)** - Data framework for LLM apps, 300+ connectors, RAG-focused
- **[CrewAI](14-agents/crewai/)** - Multi-agent orchestration, role-based collaboration
- **[AutoGPT](14-agents/autogpt/)** - Autonomous AI agent platform, visual workflow builder
- **[A-Evolve](14-agents/a-evolve/)** - Agent evolution and skill acquisition
- **[OpenHands](14-agents/openhands/)** - Autonomous software engineering agent

### RAG (6 skills)
- **[Chroma](15-rag/chroma/)** - Open-source embedding database, local/cloud
- **[FAISS](15-rag/faiss/)** - Facebook's similarity search, billion-scale, GPU acceleration
- **[Sentence Transformers](15-rag/sentence-transformers/)** - 5000+ embedding models, multilingual
- **[Pinecone](15-rag/pinecone/)** - Managed vector database, auto-scaling, <100ms latency
- **[Qdrant](15-rag/qdrant/)** - High-performance vector search, Rust-powered, hybrid search
- **[Haystack](15-rag/haystack/)** - deepset's production NLP & RAG framework, modular pipeline architecture with 100+ integrations

### Prompt Engineering (4 skills)
- **[DSPy](16-prompt-engineering/dspy/)** - Declarative prompt programming with optimizers
- **[Instructor](16-prompt-engineering/instructor/)** - Structured LLM outputs with Pydantic validation
- **[Guidance](16-prompt-engineering/guidance/)** - Constrained generation with regex/grammars
- **[Outlines](16-prompt-engineering/outlines/)** - Structured text with FSM, zero-overhead

### Observability (2 skills)
- **[LangSmith](17-observability/langsmith/)** - LLM observability, tracing, evaluation, monitoring
- **[Phoenix](17-observability/phoenix/)** - Open-source AI observability with OpenTelemetry tracing

### Multimodal (10 skills)
- **[CLIP](18-multimodal/clip/)** - OpenAI's vision-language model, zero-shot classification
- **[Whisper](18-multimodal/whisper/)** - Robust speech recognition, 99 languages
- **[LLaVA](18-multimodal/llava/)** - Vision-language assistant, GPT-4V level
- **[Stable Diffusion](18-multimodal/stable-diffusion/)** - Text-to-image generation via Diffusers, SDXL, ControlNet
- **[Segment Anything](18-multimodal/segment-anything/)** - Meta's SAM for zero-shot image segmentation
- **[BLIP-2](18-multimodal/blip-2/)** - Vision-language pretraining with Q-Former, image captioning, VQA
- **[AudioCraft](18-multimodal/audiocraft/)** - Meta's MusicGen/AudioGen for text-to-music and text-to-sound
- **[Cosmos Policy](18-multimodal/cosmos-policy/)** - NVIDIA Cosmos world foundation model for physical AI
- **[OpenPI](18-multimodal/openpi/)** - Open-source vision-language-action model for robotics
- **[OpenVLA-OFT](18-multimodal/openvla-oft/)** - Open Vision-Language-Action model with optimal fine-tuning

### Emerging Techniques (7 skills)
- **[MoE Training](19-emerging-techniques/moe-training/)** - Mixture of Experts training with DeepSpeed, Mixtral 8x7B
- **[Model Merging](19-emerging-techniques/model-merging/)** - Combine models with TIES, DARE, SLERP
- **[Long Context](19-emerging-techniques/long-context/)** - Extend context windows with RoPE, YaRN, ALiBi
- **[Speculative Decoding](19-emerging-techniques/speculative-decoding/)** - 1.5-3.6x faster inference with Medusa, Lookahead
- **[Knowledge Distillation](19-emerging-techniques/knowledge-distillation/)** - Compress models 70B->7B
- **[Model Pruning](19-emerging-techniques/model-pruning/)** - 50% sparsity with Wanda, SparseGPT
- **[Mergekit](19-emerging-techniques/mergekit/)** - Merge fine-tuned LLMs without GPU; SLERP, TIES, DARE, Frankenmerging

### ML Paper Writing (4 skills)
- **[ML Paper Writing](20-ml-paper-writing/)** - Write publication-ready papers for NeurIPS, ICML, ICLR, ACL, AAAI, COLM
- **[Academic Plotting](20-ml-paper-writing/academic-plotting/)** - Publication-quality figures with matplotlib/seaborn and Gemini AI diagrams
- **[Conference Talks](20-ml-paper-writing/presenting-conference-talks/)** - Present research at ML conferences
- **[Systems Paper Writing](20-ml-paper-writing/systems-paper-writing/)** - Write systems-oriented ML research papers

### Ideation (2 skills)
- **[Research Brainstorming](21-research-ideation/brainstorming-research-ideas/)** - Structured ideation frameworks for high-impact research directions
- **[Creative Thinking](21-research-ideation/creative-thinking-for-research/)** - Cognitive science frameworks for genuinely novel research ideas

</details>

## Skill Structure

Each skill follows a standardized format:

```
skill-name/
├── SKILL.md                    # Main guidance (200-500 lines with YAML frontmatter)
├── references/                 # Deep documentation (300KB+ target)
│   ├── README.md               # From official docs
│   ├── api.md                  # API reference
│   ├── tutorials.md            # Step-by-step guides
│   ├── issues.md               # Real GitHub issues & solutions
│   └── releases.md             # Version history
├── scripts/                    # Helper scripts (optional)
└── templates/                  # Code templates (optional)
```

## Quick Start

### Use with Claude Code

1. Clone this repository:
```bash
git clone https://github.com/qcmuu/AI-Research-Skills.git
```

2. Point your AI agent to the relevant skill directory. For example:
```
Read the skill at 03-fine-tuning/unsloth/SKILL.md and help me fine-tune Llama 3 on my dataset.
```

### Use with Any AI Coding Agent

Copy the relevant `SKILL.md` and `references/` into your project, or tell your agent to read them directly:

```
Read ./06-post-training/grpo-rl-training/SKILL.md and set up a GRPO training pipeline.
```

### Browse Skills

Explore the directory tree — each numbered category contains skill folders with comprehensive documentation:

```
ls 12-inference-serving/    # vLLM, TensorRT-LLM, llama.cpp, SGLang, Ollama
ls 08-distributed-training/  # DeepSpeed, FSDP, Accelerate, Megatron-Core, etc.
```

## Use Cases

| Role | Example Task | Skill |
|------|-------------|-------|
| **Researcher** | Fine-tune Llama 3 with custom data | `03-fine-tuning/axolotl/` |
| **ML Engineer** | Optimize inference latency | `12-inference-serving/vllm/` |
| **Student** | Learn how transformers work | `01-model-architecture/litgpt/` |
| **Team** | Scale training to 100 GPUs | `08-distributed-training/deepspeed/` |
| **Agent Builder** | Build a RAG pipeline | `15-rag/haystack/` |
| **Roboticist** | Train a vision-language-action model | `18-multimodal/openpi/` |

## Repository Structure

```
AI-Research-Skills/
├── README.md
├── CONTRIBUTING.md
├── SKILL_TEMPLATE.md
├── 0-autoresearch-skill/        (1 skill)
├── 01-model-architecture/       (5 skills)
├── 02-tokenization/             (2 skills)
├── 03-fine-tuning/              (4 skills)
├── 04-mechanistic-interpretability/ (4 skills)
├── 05-data-processing/          (2 skills)
├── 06-post-training/            (8 skills)
├── 07-safety-alignment/         (4 skills)
├── 08-distributed-training/     (6 skills)
├── 09-infrastructure/           (3 skills)
├── 10-optimization/             (7 skills)
├── 11-evaluation/               (3 skills)
├── 12-inference-serving/        (5 skills)
├── 13-mlops/                    (4 skills)
├── 14-agents/                   (6 skills)
├── 15-rag/                      (6 skills)
├── 16-prompt-engineering/       (4 skills)
├── 17-observability/            (2 skills)
├── 18-multimodal/               (10 skills)
├── 19-emerging-techniques/      (7 skills)
├── 20-ml-paper-writing/         (4 skills)
└── 21-research-ideation/        (2 skills)
```

## Contributing

We welcome contributions! See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on:

- Adding new skills
- Improving existing skills
- Quality standards and best practices
- Submission process

Each skill must follow the [quality standards](CONTRIBUTING.md) including YAML frontmatter, 200-500 line SKILL.md, and reference documentation.

## License

MIT License - See [LICENSE](LICENSE) for details.

Individual skills may reference libraries with different licenses. Please check each project's license before use.

## Acknowledgments

This library builds on the work of many open-source projects and the AI research community:

- **[Orchestra Research](https://github.com/Orchestra-Research/AI-Research-SKILLs)** - Original library (87 skills) that this project was forked from
- **[Claude Code](https://www.claude.com/product/claude-code)** - AI pair programming
- EleutherAI, HuggingFace, NVIDIA, Lightning AI, Meta AI, Anthropic
- All researchers who maintain excellent documentation
