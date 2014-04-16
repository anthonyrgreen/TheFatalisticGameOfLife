income = {('Male','All',25) : (34113,43066),
('Male','White',25) : (35468,44071),
('Male','Black',25) : (26223,31220),
('Male','Asian',25) : (46150,55714),
('Male','Hispanic',25) : (26096,32981),
('Male','All',35) : (45224,60742),
('Male','White',35) : (46296,62178),
('Male','Black',35) : (34035,41196),
('Male','Asian',35) : (62275,79565),
('Male','Hispanic',35) : (29340,40306),
('Male','All',35) : (46466,64396),
('Male','White',35) : (49041,67292),
('Male','Black',35) : (31213,41925),
('Male','Asian',35) : (50229,72971),
('Male','Hispanic',35) : (31299,42263),
('Male','All',35) : (42176,61410),
('Male','White',35) : (45050,64285),
('Male','Black',35) : (29162,41747),
('Male','Asian',35) : (37665,56234),
('Male','Hispanic',35) : (27768,37643),
('Male','All',35) : (31762,49723),
('Male','White',35) : (33407,51686),
('Male','Black',35) : (22512,33322),
('Male','Asian',35) : (25187,46752),
('Male','Hispanic',35) : (18636,28837),
('Male','All',75) : (23570,35805),
('Male','White',75) : (24335,37002),
('Male','Black',75) : (18277,27036),
('Male','Asian',75) : (15421,26241),
('Male','Hispanic',75) : (16042,25520),
('Female','All',25) : (26173,31554),
('Female','White',25) : (26786,31889),
('Female','Black',25) : (21856,25892),
('Female','Asian',25) : (35292,43761),
('Female','Hispanic',25) : (20312,24741),
('Female','All',35) : (30061,38967),
('Female','White',35) : (30105,38669),
('Female','Black',35) : (28834,35818),
('Female','Asian',35) : (33068,49997),
('Female','Hispanic',35) : (21351,28613),
('Female','All',35) : (29784,39210),
('Female','White',35) : (30589,40615),
('Female','Black',35) : (25168,32005),
('Female','Asian',35) : (31267,42035),
('Female','Hispanic',35) : (21550,29405),
('Female','All',35) : (26684,38198),
('Female','White',35) : (27974,39588),
('Female','Black',35) : (21333,30662),
('Female','Asian',35) : (24106,36810),
('Female','Hispanic',35) : (18549,27104),
('Female','All',35) : (17236,26782),
('Female','White',35) : (17560,27048),
('Female','Black',35) : (16240,25832),
('Female','Asian',35) : (14935,24781),
('Female','Hispanic',35) : (11077,18272),
('Female','All',75) : (14916,19806),
('Female','White',75) : (15322,20257),
('Female','Black',75) : (12211,16405),
('Female','Asian',75) : (11624,17657),
('Female','Hispanic',75) : (11012,14027)}

def income(gender, race, age):
  if(age < 25):
    return (0,0)
  elif(age < 35):
    return income[(gender, race, 25)]
  elif(age < 45):
    return income[(gender, race, 35)]
  elif(age < 55):
    return income[(gender, race, 45)]
  elif(age < 65):
    return income[(gender, race, 55)]
  elif(age < 75):
    return income[(gender, race, 65)]
  else:
    return income[(gender, race, 75)]
