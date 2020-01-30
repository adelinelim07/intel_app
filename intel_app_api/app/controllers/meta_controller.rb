class MetaController < ApplicationController

    def about
        render json: mergeNewsFeed
    end
    
end


########################################################################
#gems used
########################################################################
require 'nokogiri'   #to scrape data from Flightglobal
require 'open-uri'   #to open urls
require 'rss'        #to parse rss from aviator.aero
require 'json'

########################################################################
#newsfeed source 1: scrape data from flightglobal
########################################################################
def flightglobal  
  fg_output= {}
  source = "Flightglobal"
  url = "https://www.flightglobal.com/searchresults?qkeyword=&PageSize=10&parametrics=WVPUBDATE%7C%5BNOW-1DAY%20TO%20NOW%5D&SortOrder=2"
  page = Nokogiri::HTML(open(url))

  elements = page.css("li").each_with_index {|line, index|
    title = line.css("h3").text
    paragraph = line.css("p").text
    date = paragraph.slice(0,10)
    description = paragraph[20..]
    link = line.css("h3>a>@href").text
    #puts title
    #puts link
    if title.length > 2
      fg_output[index] = {
        :title => title,
        :description => description,
        :link => link,
        :source => source
        }
    end
  }
  fg_output
end

########################################################################
#newsfeed source 2: extract data from aviator
########################################################################
def aviator 
  aviator_output = {}
  source = "Aviator-aero"
  url = 'https://newsroom.aviator.aero/rss/'
  open(url) do |rss|
    feed = RSS::Parser.parse(rss)

    feed.items.each_with_index {|item, index|
      title = item.title
      description = item.description.gsub(/<\/?[^>]*>/, "")
      category = item.category
      link = item.link    
      
      aviator_output[index] = {
        :title => title,
        :description => description,
        :link => link,
        :source => source
      }
    }
    end
    aviator_output
  end


########################################################################
#combine all newsfeed into one output
########################################################################
def mergeNewsFeed
  newsFeed = aviator.merge flightglobal
  cleanNewsFeed= JSON.pretty_generate(newsFeed).gsub(":", " =>")
  cleanNewsFeed
end



