def ascii_to_string(ascii_codes):
    # chr関数を使用して、アスキーコードから文字列を生成
    ascii_codes = ascii_codes.split(',')

    s = ''.join([chr(int(code)) for code in ascii_codes])
    return s
