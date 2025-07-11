# Enhanced Diagram Components for Monadics

This guide shows how to use the new shadcn/ui-based diagram components in your MDX blog posts. These components replace basic text diagrams with beautiful, interactive visualizations.

## Available Components

### 1. ArchitectureStack

Creates layered architecture diagrams with arrows between components.

```jsx
<ArchitectureStack 
  title="System Architecture"
  layers={[
    {
      title: "Frontend Layer",
      description: "User interface and visualization",
      components: ["React", "TypeScript", "Tailwind"],
      color: "blue",
      icon: "🌐"
    },
    {
      title: "Backend Layer", 
      description: "API and business logic",
      components: ["Node.js", "Express", "PostgreSQL"],
      color: "green",
      icon: "⚡"
    }
  ]}
/>
```

**Color options**: `primary`, `secondary`, `muted`, `accent`, `destructive`, `purple`, `blue`, `green`, `orange`

### 2. FlowDiagram

Creates process flow diagrams with connected nodes.

```jsx
<FlowDiagram 
  title="Data Processing Pipeline"
  direction="vertical"
  nodes={[
    {
      id: "input",
      label: "Raw Data",
      description: "Sensor input stream",
      type: "input"
    },
    {
      id: "process", 
      label: "Transform",
      description: "Clean and normalize",
      type: "process"
    },
    {
      id: "output",
      label: "Result", 
      description: "Processed output",
      type: "output"
    }
  ]}
/>
```

**Node types**: `input`, `process`, `output`, `decision`, `data`, `hardware`, `software`
**Direction**: `vertical` or `horizontal`

### 3. QuantumProcessDiagram

Specialized for quantum consciousness content - shows superposition states and collapse.

```jsx
<QuantumProcessDiagram 
  title="Quantum Consciousness Collapse"
  states={[
    {
      label: "State A",
      description: "First superposition state", 
      probability: 0.6
    },
    {
      label: "State B",
      description: "Second superposition state",
      probability: 0.4
    }
  ]}
  collapseEvent="Conscious observation emerges"
/>
```

### 4. SystemFlowDiagram

Shows multi-step processes with detailed information.

```jsx
<SystemFlowDiagram 
  title="Processing Pipeline"
  steps={[
    {
      title: "Data Ingestion",
      description: "Collect raw data from multiple sources",
      components: ["Kafka", "Redis", "MongoDB"]
    },
    {
      title: "Processing",
      description: "Transform and analyze the data",
      components: ["Spark", "TensorFlow", "NumPy"]
    }
  ]}
/>
```

### 5. ArchitectureLayer

Individual layer component (used within ArchitectureStack).

```jsx
<ArchitectureLayer 
  title="Database Layer"
  description="Persistent data storage"
  components={["PostgreSQL", "Redis", "MongoDB"]}
  color="purple"
  icon="🗄️"
/>
```

## Usage in MDX

These components are automatically available in all MDX blog posts. Simply use them directly:

```mdx
---
title: "My Blog Post"
author: "LUCI"
date: "2025-01-15"
---

# My Architecture

<ArchitectureStack 
  title="My System"
  layers={[...]}
/>

The above diagram shows our system architecture.
```

## Best Practices

1. **Use meaningful colors** - Choose colors that represent the function (blue for data, green for processing, etc.)

2. **Keep descriptions concise** - Use 1-2 sentences maximum for descriptions

3. **Group related components** - Put similar technologies in the same layer/node

4. **Use appropriate icons** - Choose icons that represent the layer's function

5. **Consider mobile** - Diagrams automatically responsive, but test on smaller screens

## Examples from Existing Posts

See `posts/quantum-consciousness/collapse-engine-quantum-consciousness-code.mdx` for real examples of these components in action.

## Styling

All components inherit the site's theme and work with dark/light mode automatically. They use shadcn/ui components internally for consistency. 