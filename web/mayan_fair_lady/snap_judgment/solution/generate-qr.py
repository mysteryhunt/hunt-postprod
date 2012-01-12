data = """Pierce 0e736c5c5aa14e1a98e7e5d0993b194b.html
Landau 6f044ffe778d49a383487cf8af1a0e19.html
Homberg 87aa7e360d66404a8561151af602d167.html
Dorrance 05a75c7988e94a9980aa593a090be8bd.html
Pratt 012889088a5343bcbfc632c9fc238024.html
Suffolk dc9613a14da34734a1d67e54c31108c7.html
Cheney be4e1513d1f74867a5fabfb9a1934084.html
Sail 2bc363a7fa4946dd87122bd737f49c04.html
Oops oops.html
1 da0fc23dd882444c9107eca01d2c4f27.html""".split("\n")
data = [x.split(" ") for x in data]

import qrencode
import os

for bldg, path in data:
    url = "http://borbonicusandbodley.com/mayan_fair_lady/snap_judgement/" + path
    enc = qrencode.Encoder()
    im = enc.encode(url, { 'width': 200 })
    im.save('%s.png' % bldg)

