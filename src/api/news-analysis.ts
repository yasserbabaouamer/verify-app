import ApiInstance from "../utils/api-instance";
import type {
  NewsData,
  NewsAnalysisResponse,
} from "@/models/api/news";

export async function fetchNewsAnalysis(
  newsData: NewsData
): Promise<NewsAnalysisResponse> {
  const response = await ApiInstance.post("/api/v1/analyse", newsData);
  return response.data;
}
