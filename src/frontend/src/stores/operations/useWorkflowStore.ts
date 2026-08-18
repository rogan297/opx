import { create } from "zustand";
import { MOCK_WORKFLOWS, type Workflow, type WorkflowStep, type StepActionType, ACTION_REGISTRY } from "@/mocks/operations/workflows.mock";

interface WorkflowEditorState {
  workflows: Workflow[];
  currentWorkflowId: string | null;
  steps: WorkflowStep[];
  selectedStepId: string | null;

  setCurrentWorkflow: (id: string) => void;
  setSteps: (steps: WorkflowStep[]) => void;
  setSelectedStepId: (id: string | null) => void;
  addStep: (actionType: StepActionType) => void;
  removeStep: (stepId: string) => void;
  updateStepConfig: (stepId: string, config: Record<string, any>) => void;
  reorderSteps: (fromIndex: number, toIndex: number) => void;
}

export const useWorkflowStore = create<WorkflowEditorState>((set, get) => ({
  workflows: MOCK_WORKFLOWS,
  currentWorkflowId: null,
  steps: [],
  selectedStepId: null,

  setCurrentWorkflow: (id: string) => {
    const wf = get().workflows.find((w) => w.id === id);
    if (wf) {
      set({ currentWorkflowId: id, steps: wf.steps, selectedStepId: null });
    }
  },

  setSteps: (steps) => set({ steps }),

  setSelectedStepId: (id) => set({ selectedStepId: id }),

  addStep: (actionType) => {
    const actionDef = ACTION_REGISTRY[actionType];
    if (!actionDef) return;
    const { steps } = get();
    const newStep: WorkflowStep = {
      id: `ws_${Date.now()}`,
      workflowId: get().currentWorkflowId || "",
      actionType,
      category: actionDef.category,
      label: actionDef.label,
      config: { ...actionDef.config },
      nextStepId: null,
    };
    if (steps.length > 0) {
      const lastStep = steps[steps.length - 1];
      const updatedSteps = steps.map((s) => s.id === lastStep.id ? { ...s, nextStepId: newStep.id } : s);
      set({ steps: [...updatedSteps, newStep] });
    } else {
      set({ steps: [newStep] });
    }
  },

  removeStep: (stepId) => {
    const { steps } = get();
    const stepIndex = steps.findIndex((s) => s.id === stepId);
    if (stepIndex === -1) return;
    const prevStep = stepIndex > 0 ? steps[stepIndex - 1] : null;
    const nextStepId = steps[stepIndex].nextStepId;
    let updatedSteps = steps.filter((s) => s.id !== stepId);
    if (prevStep) {
      updatedSteps = updatedSteps.map((s) => s.id === prevStep.id ? { ...s, nextStepId } : s);
    }
    set({ steps: updatedSteps, selectedStepId: null });
  },

  updateStepConfig: (stepId, config) => {
    set({
      steps: get().steps.map((s) =>
        s.id === stepId ? { ...s, config: { ...s.config, ...config } } : s
      ),
    });
  },

  reorderSteps: (fromIndex, toIndex) => {
    const { steps } = get();
    const newSteps = [...steps];
    const [moved] = newSteps.splice(fromIndex, 1);
    newSteps.splice(toIndex, 0, moved);
    const relinkedSteps = newSteps.map((step, i) => ({
      ...step,
      nextStepId: i < newSteps.length - 1 ? newSteps[i + 1].id : null,
    }));
    set({ steps: relinkedSteps });
  },
}));
