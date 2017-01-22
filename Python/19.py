#!/usr/bin/python

def isYearLeap(year):
	if year % 100 == 0:
		return year % 400 == 0
	else:
		return year % 4 == 0

def daysInMonth(year, month):
	if month == 1 and isYearLeap(year):
		return 29
	else:
		days = [31,28,31,30,31,30,31,31,30,31,30,31]
		return days[month]

totalDays = 0
for month in range(0,12):
	totalDays += daysInMonth(1900, month)

cummulativeDays = [totalDays]
for year in range(1901, 2001):
	for month in range(0, 12):
		totalDays += daysInMonth(year, month)
		cummulativeDays.append(totalDays)

sundays = 0
for i in range(0, len(cummulativeDays) - 1):
	if cummulativeDays[i] % 7 == 6:
		sundays += 1

print sundays


