import { create } from "zustand";
import type { NewsAnalysisResponse } from "./models/api/news";

type AnalysisState = {
  analysis: NewsAnalysisResponse;
  setAnalysis: (newAnalysis: NewsAnalysisResponse) => void;
};

const useAnalysisStore = create<AnalysisState>((set) => ({
  analysis: {} as NewsAnalysisResponse,
  setAnalysis: (newAnalysis: NewsAnalysisResponse) =>
    set({ analysis: newAnalysis }),
}));

export default useAnalysisStore;
// The analysis state now holds the entire NewsAnalysisResponse object
