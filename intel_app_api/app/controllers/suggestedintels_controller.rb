class SuggestedintelsController < ApplicationController
  before_action :set_suggestedintel, only: [:show, :edit, :update, :destroy]

  # GET /suggestedintels
  # GET /suggestedintels.json
  def index
    render json: mergeNewsFeed
  end

  # GET /suggestedintels/1
  # GET /suggestedintels/1.json
  def show
  end

  # GET /suggestedintels/new
  #def new
  #  @suggestedintel = Suggestedintel.new
  #end

  # GET /suggestedintels/1/edit
  #def edit
  #end

  # POST /suggestedintels
  # POST /suggestedintels.json
  # def create
  #   @suggestedintel = Suggestedintel.new(suggestedintel_params)

  #   respond_to do |format|
  #     if @suggestedintel.save
  #       format.html { redirect_to @suggestedintel, notice: 'Suggestedintel was successfully created.' }
  #       format.json { render :show, status: :created, location: @suggestedintel }
  #     else
  #       format.html { render :new }
  #       format.json { render json: @suggestedintel.errors, status: :unprocessable_entity }
  #     end
  #   end
  # end

  # PATCH/PUT /suggestedintels/1
  # PATCH/PUT /suggestedintels/1.json
  # def update
  #   respond_to do |format|
  #     if @suggestedintel.update(suggestedintel_params)
  #       format.html { redirect_to @suggestedintel, notice: 'Suggestedintel was successfully updated.' }
  #       format.json { render :show, status: :ok, location: @suggestedintel }
  #     else
  #       format.html { render :edit }
  #       format.json { render json: @suggestedintel.errors, status: :unprocessable_entity }
  #     end
  #   end
  # end

  # DELETE /suggestedintels/1
  # DELETE /suggestedintels/1.json
  # def destroy
  #   @suggestedintel.destroy
  #   respond_to do |format|
  #     format.html { redirect_to suggestedintels_url, notice: 'Suggestedintel was successfully destroyed.' }
  #     format.json { head :no_content }
  #   end
  # end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_suggestedintel
      @suggestedintel = Suggestedintel.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def suggestedintel_params
      params.require(:suggestedintel).permit(:title, :content, :source, :tags, :user_id, :type, :date)
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
fg_output= []
source = "Flightglobal"
url = "https://www.flightglobal.com/searchresults?qkeyword=&PageSize=10&parametrics=WVPUBDATE%7C%5BNOW-1DAY%20TO%20NOW%5D&SortOrder=2"
page = Nokogiri::HTML(open(url))

elements = page.css("li").each_with_index {|line, index|
  title = line.css("h3").text
  paragraph = line.css("p").text
  date = paragraph.slice(0,10)
  description = paragraph[20..]
  link = line.css("h3>a>@href").text
  img = ""

  line.css(" img").each do |img_node|
    img_attributes = img_node.attributes.values
    img_attributes.each do |attr|
      #p [attr.name, attr.value]
      if attr.name == "data-src"
        img = attr.value
        p img
      end
    end
  end
  
  if title.length > 2
    fg_output.push( {
      :index => index,
      :title => title,
      :description => description,
      :img => img,
      :link => link,
      :source => source
      })
      puts fg_output
  end
}
fg_output

end

########################################################################
#newsfeed source 2: extract data from aviator
########################################################################
def aviator 
aviator_output = []
source = "Aviator-aero"
url = 'https://newsroom.aviator.aero/rss/'
open(url) do |rss|
  feed = RSS::Parser.parse(rss)

  feed.items.each_with_index {|item, index|
    title = item.title
    description = item.description.gsub(/<\/?[^>]*>/, "")
    contentEncoded = item.content_encoded
    img = contentEncoded.split("src=")[1]
    img = img.split("alt")[0]
    category = item.category
    link = item.link   
    
    #puts img
    #puts ("***********************")

    aviator_output.push( {
      :index => index,
      :title => title,
      :description => description,
      :img => img,
      :link => link,
      :source => source
    })
  }
  end
  aviator_output
end


########################################################################
#combine all newsfeed into one output
########################################################################
def mergeNewsFeed
newsFeed = aviator + flightglobal
#cleanNewsFeed= JSON.pretty_generate(newsFeed).gsub(":", " =>")
#cleanNewsFeed
newsFeed
end
