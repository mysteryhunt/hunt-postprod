inFile = File.open(ARGV[0])

inFile.each_line do |line|
  if line.match(/\+---/) then
    puts "</tr>"
    puts "<tr>"
  elsif line.match(/\|\d+ [A-Z]/) then
    line = line.gsub(/\|[^|]+/) do |match|
      if match.match(/\d+ [A-Z]/) then
        puts "<td>" + match[1..-1] + "</td>"
      elsif match.match(/#+/) then
        puts "<td class=\"black\"></td>"
      end
    end

    puts line
  elsif line.match(/\| /) then
  else
    puts line
  end
end
