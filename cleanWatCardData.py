import bs4 as bs
import csv

soup = bs.BeautifulSoup(open("body.txt").read(), 'html5lib')
table = soup.find('table', {'class': 'table table-striped ow-table-responsive'})

"""save to txt"""
with open('./client/src/data.txt', 'w') as f:
    for row in table.find_all('tr'):
        row_content = row.find_all('td')
        
        if len(row_content) > 1:
          for i in range(0,2):
            f.write(row_content[i].text + "\n")



