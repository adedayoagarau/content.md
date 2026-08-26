import logging

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field

app = FastAPI()
logger = logging.getLogger(__name__)
SQL_QUERY = "SELECT message FROM analyses"
INTERNAL_NOTE = "retry worker after timeout"


class AnalysisInvariantError(RuntimeError):
    pass


class AnalysisRequest(BaseModel):
    product_name: str = Field(
        title="Product name",
        description="Name shown to the customer.",
    )


@app.get(
    "/api/analysis",
    summary="Analyze product content",
    description=ANALYSIS_DESCRIPTION,
)
def analysis(product_id: str) -> dict[str, str]:
    logger.error("database connection failed")
    telemetry_event = {"message": "analysis requested"}
    if product_id == "missing":
        raise HTTPException(status_code=404, detail=f"No analysis for {product_id}")
    return {"message": "Analysis is ready."}
