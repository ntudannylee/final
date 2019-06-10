# final b04106024 圖資四李書文
# demo
https://ntudannylee.github.io/final/
# What is this?

這次期末專題主題為jquery以及javascript的應用，本專題包含兩個部分，俄羅斯方塊以及輪盤賭，並分別將如何使用以及用到的技術詳細打進該類別底下。


# 俄羅斯方塊
俄羅斯方塊是我以前常玩的遊戲之一，因此想藉此次機會寫出一個prototype，內容百分百原創，只有碰撞以及翻轉有參考stack overflow上神人寫的演算法。

包含技術有：

1. canvas繪圖技術

2. 嚴謹的oop物件導向設計

3. 支援RWD建置

4. css採用flex-box進行雕板

5. 可輸入密技：在畫面中直接輸入danny，會啟動密技功能

6. 核心技術：透過sessionstorage存取coin的value，並將該value在輪盤賭中繼續使用


# 輪盤賭
羅盤賭是我又愛又恨的作品，因為之前有一段時間沈迷於網路賭博，也是因為輪盤賭的關係損失了不少錢，那時候也下定決心一有機會我就要把這個寫出來。

使用方法：將自己擁有的資金依據自己的想法將金額打進賭桌，若轉到藍色則該金額加倍，反之則扣除該金額於資金中。

參考code: http://sc.chinaz.com/jiaoben/150117143400.htm

參考該連結中輪盤賭的演算法以及動畫效果，其餘的獎金加成以及顏色顯示判斷都是本人親自撰寫。

包含技術：

1. canvas繪圖技術

2. 支援RWD建置

3. css採用flex-box進行雕板

4. 透過sessionstorage存取key-value，若使用者點選返回賺star幣，則該value會存取至瀏覽器中並getitem到俄羅斯方塊中
