module ViewHelpers

  # params - number number
  #          delimiter string
  def number_with_delimiter(number, delimiter = ',')
    parts = number.to_s.to_str.split('.')
    parts[0].gsub!(/(\d)(?=(\d\d\d)+(?!\d))/, "\\1#{delimiter}")
    parts.join('.')
  end

  # params - number number
  #          precision int
  def number_with_precision(number, precision = 2)
    multiple = (10.0 ** precision)
    if number > 0
      number = (number * multiple).floor / multiple
    else
      number = (number * multiple).ceil / multiple
    end
    sprintf("%.#{precision}f", number)
  end

  # params - number number
  #          args array
  def number_to_currency(number, args = {})
    args = { currency: '&pound;', precision: 2, delimiter: ',' }.merge(args)

    number = number_with_precision(number, args[:precision])
    number = number_with_delimiter(number, args[:delimiter])

    "#{args[:currency]}#{number}"
  end

  def number_to_percentage(number, sign = true, ndigits = 1)
    (number * 100).round(ndigits).to_s + (sign ? '%' : '')
  end

  def dasherize(string)
    string.downcase.strip.gsub(' ', '-').gsub(/[^\w-]/, '')
  end

end
