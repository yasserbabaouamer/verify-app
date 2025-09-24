import asyncio
import cProfile
from services.analysis_service import analyse_news
from services.crosscheck_service import crosscheck_news
from schemas import NewsSchema
import cProfile
import pstats


# Example test data (replace with realistic values)
news = NewsSchema(
    headline="اختبار عنوان الخبر",
    body="هذا نص الخبر التجريبي للتحليل.",
    url="http://example.com/news/123",
    date=None
)


if __name__ == "__main__":
    profiler = cProfile.Profile()
    profiler.enable()
    # asyncio.run(analyse_news(news))
    profiler.disable()
    stats = pstats.Stats(profiler)
    stats.sort_stats('cumtime').print_stats(20)  # Show top 20 by cumulative time
