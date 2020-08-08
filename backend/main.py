from fastapi import FastAPI
from names_loader import get_names

app = FastAPI()

@app.get("/names")
async def names():
    names = get_names("data/names.csv")
    return {
        "names": names
    }
