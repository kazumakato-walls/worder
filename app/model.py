# -*- coding: utf-8 -*-
# モデルの定義
from sqlalchemy import Column, Integer, String, Boolean,text
from sqlalchemy.dialects.mysql import TIMESTAMP as Timestamp
from pydantic import BaseModel
from db import Base
from db import ENGINE

# サンプル
# userテーブルのモデルUserTableを定義
class UserTable(Base):
    __tablename__ = 'user'
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(30), nullable=False)
    age = Column(Integer)


# POSTやPUTのとき受け取るRequest Bodyのモデルを定義
class User(BaseModel):
    id: int
    name: str
    age: int
    
# Worder ################################################################
# メニューテーブルのモデル定義
class MenuTable(Base):
    __tablename__ = 'menu'
    id = Column(Integer, primary_key=True, autoincrement=True)
    food = Column(String(30), nullable=False)
    price = Column(Integer, nullable=False)
    visible_flg = Column(Boolean, nullable=False)
    created_at = Column(Timestamp, nullable=False,server_default=text('current_timestamp'))
    updated_at = Column(Timestamp, nullable=False,server_default=text('current_timestamp on update current_timestamp'))


# POSTやPUTのとき受け取るRequest Bodyのモデルを定義
class Menu(BaseModel):
    id: int
    food:str
    price: int 
    visible_flg: bool
    created_at: str
    updated_at:str

# 注文テーブルのモデル定義
class OrderTable(Base):
    __tablename__ = 'order'
    id = Column(Integer, primary_key=True, autoincrement=True)
    menu_id = Column(Integer, nullable=False)
    seat = Column(String(6), nullable=False)    
    delivery_flg = Column(Integer, nullable=False)
    bill_flg = Column(Boolean, nullable=False)
    created_at = Column(Timestamp, nullable=False,server_default=text('current_timestamp'))
    updated_at = Column(Timestamp, nullable=False,server_default=text('current_timestamp on update current_timestamp'))
    
# POSTやPUTのとき受け取るRequest Bodyのモデルを定義
class Order(BaseModel):
    id: int
    seat:str
    menu_id: int 
    delivery_flg: int
    bill_flg: bool
    created_at: str
    updated_at: str
    
def main():
    # テーブルが存在しなければ、テーブルを作成
    Base.metadata.create_all(bind=ENGINE)


if __name__ == "__main__":
    main()
