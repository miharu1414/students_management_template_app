from datetime import datetime

def DateToFiscalYear(date_str):
    try:
        # Date型に変換
        date = datetime.strptime(date_str, "%Y-%m-%d")
        
        # 年度の計算
        if date.month >= 4:
            fiscal_year = date.year 
        else:
            fiscal_year = date.year - 1
        
        return str(fiscal_year)
    except ValueError:
        # 有効な日付の形式でない場合に例外を処理する
        return "無効な日付形式です"
    
if __name__ == "__main__":
    print(DateToFiscalYear("2023-03-12"))
