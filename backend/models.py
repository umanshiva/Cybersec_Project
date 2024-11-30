from sqlalchemy import Column, Integer, String, Float, Boolean, ForeignKey, DateTime
from database import Base
from datetime import datetime

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    hashed_password = Column(String)

class POSLog(Base):
    __tablename__ = "pos_logs"

    id = Column(Integer, primary_key=True, index=True)
    timestamp = Column(DateTime, default=datetime.utcnow)
    transaction_id = Column(String, unique=True, index=True)
    duration_time = Column(Float)
    item_code = Column(String)
    amount = Column(Float)
    user_id = Column(Integer, ForeignKey("users.id"))
    payment_method = Column(String)
    is_anomalous = Column(Boolean, default=False)

    __table_args__ = {"extend_existing": True}
