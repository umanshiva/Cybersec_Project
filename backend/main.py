# from fastapi import FastAPI, Depends, HTTPException, status
# from sqlalchemy.orm import Session
# from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
# from jose import JWTError, jwt
# from datetime import datetime, timezone, timedelta
# from passlib.context import CryptContext
# from models import User
# from database import SessionLocal, engine
# from pydantic import BaseModel
# from fastapi.middleware.cors import CORSMiddleware



# app = FastAPI(debug=True)

# oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# origins = [
#     "http://localhost:3000"  # Adjust the port if your frontend runs on a different one
#     # "https://yourfrontenddomain.com",
# ]

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=origins,  # Allows all origins from the list
#     allow_credentials=True,
#     allow_methods=["*"],  # Allows all methods
#     allow_headers=["*"],  # Allows all headers
# )

# # Dependency
# def get_db():
#     db = SessionLocal()
#     try:
#         yield db
#     finally:
#         db.close()

# pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# # Your JWT secret and algorithm
# SECRET_KEY = "your_secret_key"
# ALGORITHM = "HS256"
# ACCESS_TOKEN_EXPIRE_MINUTES = 30


# class UserCreate(BaseModel):
#     username: str
#     password: str

# def get_user_by_username(db: Session, username: str):
#     return db.query(User).filter(User.username == username).first()

# def create_user(db: Session, user: UserCreate):
#     hashed_password = pwd_context.hash(user.password)
#     db_user = User(username=user.username, hashed_password=hashed_password)
#     db.add(db_user)
#     db.commit()
#     return "complete"

# @app.post("/register")
# def register_user(user: UserCreate, db: Session = Depends(get_db)):
#     db_user = get_user_by_username(db, username=user.username)
#     if db_user:
#         raise HTTPException(status_code=400, detail="Username already registered")
#     return create_user(db=db, user=user)

# # Authenticate the user
# def authenticate_user(username: str, password: str, db: Session):
#     user = db.query(User).filter(User.username == username).first()
#     if not user:
#         return False
#     if not pwd_context.verify(password, user.hashed_password):
#         return False
#     return user

# # Create access token
# def create_access_token(data: dict, expires_delta: timedelta | None = None):
#     to_encode = data.copy()
#     if expires_delta:
#         expire = datetime.now(timezone.utc) + expires_delta
#     else:
#         expire = datetime.now(timezone.utc) + timedelta(minutes=15)
#     to_encode.update({"exp": expire})
#     encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
#     return encoded_jwt

# @app.post("/token")
# def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
#     user = authenticate_user(form_data.username, form_data.password, db)
#     if not user:
#         raise HTTPException(
#             status_code=status.HTTP_401_UNAUTHORIZED,
#             detail="Incorrect username or password",
#             headers={"WWW-Authenticate": "Bearer"},
#         )
#     access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
#     access_token = create_access_token(
#         data={"sub": user.username}, expires_delta=access_token_expires
#     )
#     return {"access_token": access_token, "token_type": "bearer"}


# def verify_token(token: str = Depends(oauth2_scheme)):
#     try:
#         payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
#         username: str = payload.get("sub")
#         if username is None:
#             raise HTTPException(status_code=403, detail="Token is invalid or expired")
#         return payload
#     except JWTError:
#         raise HTTPException(status_code=403, detail="Token is invalid or expired")

# @app.get("/verify-token/{token}")
# async def verify_user_token(token: str):
#     verify_token(token=token)
#     return {"message": "Token is valid"}


from fastapi import FastAPI, Request, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import JWTError, jwt
from datetime import datetime, timezone, timedelta
from passlib.context import CryptContext
from models import User
from database import SessionLocal
from pydantic import BaseModel
import logging

# Initialize the app
app = FastAPI(debug=True)

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


# Configure CORS
origins = [
    "http://localhost:3000"  # Adjust the port if your frontend runs on a different one
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("NetworkLogger")

# Middleware to capture and log network requests
@app.middleware("http")
async def log_network_requests(request: Request, call_next):
    # Get client IP and other network details
    print("Hey this is the info : ")
    print(request.client)
    client_host = request.client.host
    client_port = request.client.port
    request_url = request.url.path
    request_method = request.method
    request_headers = dict(request.headers)

    # print("====== Network Request Info ======")
    # print(f"Client IP: {client_host}")
    # print(f"Client Port: {client_port}")
    # print(f"Request URL: {request_url}")
    # print(f"Request Method: {request_method}")
    # print(f"Request Headers: {request_headers}")
    
    logger.info(f"Client IP: {client_host}")
    logger.info(f"Client Port: {client_port}")
    logger.info(f"Request URL: {request_url}")
    logger.info(f"Request Method: {request_method}")
    logger.info(f"Request Headers: {request_headers}")

    # Optionally log payload (if it's a POST/PUT request)
    if request_method in ["POST", "PUT"]:
        body = await request.body()
        logger.info(f"Request Body: {body.decode('utf-8')}")
    
    # Proceed with the requestk
    response = await call_next(request)
    return response

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Your JWT secret and algorithm
SECRET_KEY = "your_secret_key"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

class UserCreate(BaseModel):
    username: str
    password: str

def get_user_by_username(db: Session, username: str):
    return db.query(User).filter(User.username == username).first()

def create_user(db: Session, user: UserCreate):
    hashed_password = pwd_context.hash(user.password)
    db_user = User(username=user.username, hashed_password=hashed_password)
    db.add(db_user)
    db.commit()
    return "complete"

@app.post("/register")
def register_user(user: UserCreate, db: Session = Depends(get_db)):
    db_user = get_user_by_username(db, username=user.username)
    if db_user:
        raise HTTPException(status_code=400, detail="Username already registered")
    return create_user(db=db, user=user)

# Authenticate the user
def authenticate_user(username: str, password: str, db: Session):
    user = db.query(User).filter(User.username == username).first()
    if not user:
        return False
    if not pwd_context.verify(password, user.hashed_password):
        return False
    return user

# Create access token
def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

@app.post("/token")
def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = authenticate_user(form_data.username, form_data.password, db)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}


def verify_token(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise HTTPException(status_code=403, detail="Token is invalid or expired")
        return payload
    except JWTError:
        raise HTTPException(status_code=403, detail="Token is invalid or expired")

@app.get("/verify-token/{token}")
async def verify_user_token(token: str):
    verify_token(token=token)
    return {"message": "Token is valid"}

