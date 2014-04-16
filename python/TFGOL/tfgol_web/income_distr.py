from __future__ import division
from math import exp, gamma
from scipy.special import gammainc
import income_table

def income_prob_density_func(gender, race, age):
	(inc_med, inc_mean) = income_table.income(gender, race, age)
	k = (.2(inc_med/inc_mean) + .8)/(3-3(inc_med/inc_mean))
	theta = inc_mean/k
	func = lambda x: x**(k-1)*exp(-x/theta)/(gamma(x)*theta**k)
	
def income_cumulative_prob_func(gender, race, age):
	(inc_med, inc_mean) = income_table.income(gender, race, age)
	k = (.2(inc_med/inc_mean) + .8)/(3-3(inc_med/inc_mean))
	theta = inc_mean/k
	lower_gamma = lambda: x, y: 
	func = lambda x: gammainc(k, x/theta)
	
#def income_cumulative_prob_inverse(gender, race, age):
##scipy.special.gammaincinv(x1, x2[, out]) = <ufunc 'gammaincinv'>
##gammaincinv(a, y) returns x such that gammainc(a, x) = y.

	
