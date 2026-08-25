from fastapi import FastAPI

app = FastAPI()


@app.get("/api/analysis", summary="Analyze product content")
def analysis() -> dict[str, str]:
    return {"message": "Analysis is ready."}
