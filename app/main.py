from fastapi import FastAPI
from typing import List  # ネストされたBodyを定義するために必要
from starlette.middleware.cors import CORSMiddleware  # CORSを回避するために必要
from db import session  # DBと接続するためのセッション
from model import UserTable, User, MenuTable, OrderTable, CategoryTable  # 今回使うモデルをインポート

import datetime

app = FastAPI()

# CORSを回避するために設定
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ----------APIの定義------------
# テーブルにいる全ユーザ情報を取得 GET
@app.get("/users")
def read_users():
    users = session.query(UserTable).all()
    return users

# idにマッチするユーザ情報を取得 GET
@app.get("/users/{user_id}")
def read_user(user_id: int):
    user = session.query(UserTable).\
        filter(UserTable.id == user_id).first()
    return user

# ユーザ情報を登録 POST
@app.post("/user")
# クエリでnameとstrを受け取る
# /user?name="三郎"&age=10
async def create_user(name: str, age: int):
    user = UserTable()
    user.name = name
    user.age = age
    session.add(user)
    session.commit()

# 複数のユーザ情報を更新 PUT
@app.put("/users")
# modelで定義したUserモデルのリクエストbodyをリストに入れた形で受け取る
# users=[{"id": 1, "name": "一郎", "age": 16},{"id": 2, "name": "二郎", "age": 20}]
async def update_users(users: List[User]):
    for new_user in users:
        user = session.query(UserTable).\
            filter(UserTable.id == new_user.id).first()
        user.name = new_user.name
        user.age = new_user.age
        session.commit()

# ----------WorderAPIの定義------------
# メニューリストを取得 GET
@app.get("/menus")
async def read_menus():
    menus = session.query(MenuTable).all()
    return menus

# メニュー追加
@app.put("/menus")
async def create_menu(category_id: int, menu: str, price: int, view_no: int):
    t_delta = datetime.timedelta(hours=9)
    JST = datetime.timezone(t_delta, 'JST') 
    menus = MenuTable()
    menus.category_id = category_id
    menus.menu = menu
    menus.price = price
    menus.view_no = view_no
    menus.created_at = datetime.datetime.now(JST)
    menus.updated_at = datetime.datetime.now(JST)
    session.add(menus)
    session.commit()

# メニュー編集
@app.post("/menus")
async def create_menu(id:int, category_id: int, menu: str, price: int, view_no: int):
    t_delta = datetime.timedelta(hours=9)
    JST = datetime.timezone(t_delta, 'JST') 
    menus = session.query(MenuTable).filter(MenuTable.id == id).first()
    menus.category_id = category_id
    menus.menu = menu
    menus.price = price
    menus.view_no = view_no
    menus.updated_at = datetime.datetime.now(JST)    
    session.commit()

# 注文情報
@app.get("/orders")
async def read_orders():
    orders = session.query(OrderTable.id,
                           OrderTable.menu_id,
                           OrderTable.seat,
                           OrderTable.price,
                           OrderTable.order_st,
                           OrderTable.bill_st,
                           OrderTable.created_at,
                           MenuTable.menu)\
    .join(OrderTable, MenuTable.id == OrderTable.menu_id)\
    .filter(OrderTable.order_st == 0)\
    .all()
    return orders

# 注文情報　テーブル毎に取得
@app.get("/orders/{seat}")
async def read_orders(seat: str):
    orders = session.query(OrderTable.id,
                           OrderTable.menu_id,
                           OrderTable.seat,
                           OrderTable.price,
                           OrderTable.order_st,
                           OrderTable.bill_st,
                           OrderTable.created_at,
                           MenuTable.menu)\
    .filter(OrderTable.seat == seat)\
    .join(OrderTable, MenuTable.id == OrderTable.menu_id)\
    .all()
    return orders

# 注文追加
@app.put("/orders")
async def create_order(menu_id: int, price: int, seat: str):
    t_delta = datetime.timedelta(hours=9)
    JST = datetime.timezone(t_delta, 'JST') 
    orders = OrderTable()
    orders.menu_id = menu_id
    orders.price = price
    orders.seat = seat
    orders.order_st = 0
    orders.bill_st = 0
    orders.created_at = datetime.datetime.now(JST)
    orders.updated_at = datetime.datetime.now(JST)
    session.add(orders)
    session.commit()

#料理提供、注文キャンセル時の処理
@app.post("/orders")
async def update_order(id:int, order_st: int):
    t_delta = datetime.timedelta(hours=9)
    JST = datetime.timezone(t_delta, 'JST') 
    orders = session.query(OrderTable).filter(OrderTable.id == id).first()
    orders.order_st = order_st
    orders.updated_at = datetime.datetime.now(JST)
    session.commit()

# 会計時の処理
@app.post("/order_bill")
async def bill_orders(seat: int, bill_st: int):
    t_delta = datetime.timedelta(hours=9)
    JST = datetime.timezone(t_delta, 'JST') 
    orders = session.query(OrderTable).filter(OrderTable.seat == seat).all()
    orders.bill_st = bill_st
    orders.updated_at = datetime.datetime.now(JST)
    session.commit()

#  カテゴリ一覧取得
@app.get("/categories")
async def read_categories():
    categories = session.query(CategoryTable).all()
    return categories

#  カテゴリ追加
@app.put("/categories")
async def read_categories(category: str):
    t_delta = datetime.timedelta(hours=9)
    JST = datetime.timezone(t_delta, 'JST') 
    categories = CategoryTable()
    categories.category = category
    categories.created_at = datetime.datetime.now(JST)
    categories.updated_at = datetime.datetime.now(JST)
    session.add(categories)
    session.commit()

