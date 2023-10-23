import requests
from bs4 import BeautifulSoup
import csv

# URL của trang web bạn muốn trích xuất dữ liệu
url = "https://cafef.vn/doc-nhanh/trang-2.chn"

# Sử dụng requests để lấy nội dung của trang web
response = requests.get(url)
soup = BeautifulSoup(response.text, 'html.parser')

# Tạo danh sách để lưu dữ liệu
data = []

# Tìm tất cả các mục có class "item expandable"
items = soup.find_all('div', class_='item expandable')

# Duyệt qua từng mục và trích xuất thông tin
for item in items:
    time = item.find('div', class_='timeTitle time-ago')['title']
    title = item.find('a', class_='news-title')['title']
    link = item.find('a', class_='news-title')['href']
    content = item.find('div', class_='abs').text.strip()
    data.append([time, title, link, content])

# Lưu dữ liệu vào tệp CSV
with open('C:\\Hai\\OK\\cafe.csv', 'w', newline='', encoding='utf-8') as csvfile:
    csv_writer = csv.writer(csvfile)
    csv_writer.writerow(['Time', 'Title', 'Link', 'Content'])  # Viết tiêu đề cho cột
    csv_writer.writerows(data)

print("Dữ liệu đã được trích xuất và lưu vào cafe.csv")
