from __future__ import division
import sys
sys.path.insert(0, './stat_data/')
#from math import exp, gamma
from math import exp
from gam import Gamma
from scipy.special import gammainc, gammaincinv
import income_table
import death_table

def income_prob_density_func(gender, race, age):
	(inc_med, inc_mean) = income_table.get_income(gender, race, age)
	k = (.2*(inc_med/inc_mean) + .8)/(3-3*(inc_med/inc_mean))
	theta = inc_mean/k
#	func = lambda x: x**(k-1)*exp(-x/theta)/(gamma(x)*theta**k)
	func = lambda x: x**(k-1)*exp(-x/theta)/(Gamma(x)*theta**k)
	return func
	
def income_cumulative_prob_func(gender, race, age):
	(inc_med, inc_mean) = income_table.get_income(gender, race, age)
	k = (.2*(inc_med/inc_mean) + .8)/(3-3*(inc_med/inc_mean))
	theta = inc_mean/k
	func = lambda x: gammainc(k, x/theta)
	return func

def income_cumulative_prob_inverse(gender, race, age):
	(inc_med, inc_mean) = income_table.get_income(gender, race, age)
	k = (.2*(inc_med/inc_mean) + .8)/(3-3*(inc_med/inc_mean))
	theta = inc_mean/k
	func = lambda prob: gammaincinv(k, prob)*theta
	return func

def death_prob(gender, age):
	return death_table.get_death(gender, age)
