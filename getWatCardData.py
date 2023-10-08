from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from bs4 import BeautifulSoup
import requests

"""using selenium to auto scrape, but had security concerns"""

usernameStr = ''
passwordStr = ''

browser = webdriver.Chrome()
browser.get(('https://watcard.uwaterloo.ca/OneWeb/Account/LogOn'))

browser.find_element(By.NAME, "Account").send_keys(usernameStr)
browser.find_element(By.NAME, "Password").send_keys(passwordStr)
browser.find_element(By.CSS_SELECTOR, ".ow-btn-primary").click()

browser.get('https://watcard.uwaterloo.ca/OneWeb/Financial/Transactions')
browser.find_element(By.ID, "trans_start_date").clear()
browser.find_element(By.ID, "trans_start_date").send_keys("value", '10/07/2000')
browser.find_element(By.ID, "trans_search").click()

