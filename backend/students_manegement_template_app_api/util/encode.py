def string_to_ascii(s):
    s = str(s)
    # ord関数を使用して、文字列の1文字ずつのアスキーコードを取得
    ascii_codes = [ord(ch) for ch in s]
    name = str(ascii_codes)
    ans = name[1:-1]
    return ans
