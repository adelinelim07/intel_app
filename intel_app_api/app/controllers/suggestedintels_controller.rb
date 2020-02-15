class SuggestedintelsController < ApplicationController

  def keywords
    render json: extractKeywords
  end


  before_action :set_suggestedintel, only: [:show, :edit, :update, :destroy]

  # GET /suggestedintels
  # GET /suggestedintels.json
  def index
    render json: mergeNewsFeed
    #render json: offlineTest
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
      params.require(:suggestedintel).permit(:title, :content, :source, :tags, :user_id, :category, :date)
    end
end

########################################################################
#gems used
########################################################################
require 'nokogiri'   #to scrape data from Flightglobal
require 'open-uri'   #to open urls
require 'rss'        #to parse rss from aviator.aero
require 'json'
require 'highscore'
require 'bloomfilter-rb'
require 'fast-stemmer'
require 'stemmer'

########################################################################
#newsfeed source 1: scrape data from flightglobal
########################################################################
def flightglobal  
fg_output= []
source = "Flightglobal"
category = "public"
url = [
  "https://www.flightglobal.com/searchresults?qkeyword=&PageSize=10&parametrics=WVPUBDATE%7C%5BNOW-1DAY%20TO%20NOW%5D&SortOrder=2",
  "https://www.flightglobal.com/searchresults?qkeyword=&PageSize=10&parametrics=WVPUBDATE%7C%5BNOW-1DAY%20TO%20NOW%5D&cmd=GoToPage&val=2&SortOrder=2"
]

for i in 0..1
  page = Nokogiri::HTML(open(url[i]))

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
        :source => source,
        :category => category
        })
    end
    }
  end

  fg_output
end

########################################################################
#newsfeed source 2: extract data from aviator
########################################################################
def aviator 
aviator_output = []
source = "Aviator-aero"
category = "public"
url = 'https://newsroom.aviator.aero/rss/'
open(url) do |rss|
  feed = RSS::Parser.parse(rss)

  feed.items.each_with_index {|item, index|
    title = item.title
    description = item.description.gsub(/<\/?[^>]*>/, "")
    contentEncoded = item.content_encoded
    img = contentEncoded.split("src=")[1]
    img = img.split("alt")[0]
    img = img.gsub(/"/, '')
    #img.replace(/&quot;/g, '"')
    #category = item.category
    link = item.link   
    
    puts img
    puts ("***********************")

    aviator_output.push( {
      :index => index,
      :title => title,
      :description => description,
      :img => img,
      :link => link,
      :source => source,
      :category => category
    })
  }
  end
  aviator_output
end


########################################################################
#newsfeed source 3: extract data from capa
########################################################################
def capa  
  capa_output = []
  source = "CAPA"
  category = "public"
  img = "https://seekvectorlogo.com/wp-content/uploads/2019/01/capa-centre-for-aviation-vector-logo.png"
  url = "https://centreforaviation.com/news"
  page = Nokogiri::HTML(open(url))
  
  elements = page.css(".news_innerContainer_1a7").each_with_index {|line, index|
    title = line.css("span").text
    link = line.css("h2>a>@href").text
    
    if title.length > 2
      capa_output.push( {
        :index => index,
        :title => title,
        :link => link,
        :img => img,
        :source => source,
        :category => category
        })
    end
  }
  capa_output
  
end

########################################################################
#combine all newsfeed into one output
########################################################################
def mergeNewsFeed
newsFeed = aviator + flightglobal + capa
#cleanNewsFeed= JSON.pretty_generate(newsFeed).gsub(":", " =>")
#cleanNewsFeed
newsFeed
end


def getTitles
  titles = mergeNewsFeed.map {|x| x.values[1]}
  titles
end

########################################################################
# FLATTEN HASH
########################################################################
def flatten_hash(hash)
  hash.each_with_object({}) do |(k, v), h|
    if v.is_a? Hash
      flatten_hash(v).map do |h_k, h_v|
        h["#{k}.#{h_k}".to_sym] = h_v
      end
    else 
      h[k] = v
    end
   end
end

#########################################################################
# TOP KEYWORDS
#########################################################################
def extractKeywords

  #extract= flatten_hash(mergeNewsFeed).to_s.downcase
  extractedKeywords =[]
  extract = getTitles.to_s.downcase
  blacklist_array = ['newsroom','aviator','flightglobal',"the","https","aero","aviator","newsroom","flightglobal","100x67",'100x67',"and",'and','aero',"aero","air",'air','link',"link",'description',"description",'nil',"nil",'img',"img","index",'index','title',"title","aviation",'aviation',"pictures",'pictures',"source",'source','net',"net","with",'with','from',"from",'its',"its","jpg",'jpg','1280px',"1280px",'content',"content",'will',"will",'images',"images","for",'for',"new",'new','www','com','article','that','has','cloudfront','flights','today','january','february','march','april','may','june','july','august','september','october','november','december','aircraft','announces','world','arrivals','names','million','airlines' ]

  keywords = extract.keywords(Highscore::Blacklist.load(blacklist_array))

  keywords.top(10).each do |k|
    extractedKeywords.push( {
        :keyword=> k.text.upcase,
        :count => k.weight,
        })
  end
  extractedKeywords
end



# #############
# #MOCK DATA TO TEST
# #############
 def offlineTest
   mockdata = 
   [{"index":0,"title":"CDB Aviation Completes Delivery of Six Airbus Aircraft to TAP","description":"HAMBURG – January 31, 2020 – CDB Aviation, a wholly owned Irish subsidiary of China Development Bank Financial Leasing Co., Limited (“CDB Leasing”), announced the delivery of the sixth, final Airbus aircraft to Portugal’s leading airline, TAP Air Portugal (“TAP”).TAP took delivery of an Airbus A321neo aircraft in Hamburg this","img":"\"https://newsroom.aviator.aero/content/images/2020/02/TAP-final-delivery.jpg\" ","link":"https://newsroom.aviator.aero/cdb-aviation-completes-delivery-of-six-airbus-aircraft-to-tap/","source":"Aviator-aero"},{"index":1,"title":"Qatar Airways Suspends Flights to China due to Significant Operational Challenges","description":"DOHA, Qatar – Qatar Airways has taken the decision to suspend flights to mainland China from 3 February until further notice due to significant operational challenges caused by entry restrictions imposed by several countries. An ongoing review of operations will be conducted weekly with the intention to reinstate the flights as","img":"\"https://newsroom.aviator.aero/content/images/2020/02/Boeing_787-8_A7-BCE_Qatar_Airways_-10424119266-.jpg\" ","link":"https://newsroom.aviator.aero/qatar-airways-suspends-flights-to-china-due-to-significant-operational-challenges/","source":"Aviator-aero"},{"index":2,"title":"Aeromexico Completes Successful Unsecured Senior Notes Issuance in International Markets","description":"Grupo Aeromexico (\"Aeromexico\"), reports that today, it successfully concluded the offering of debt instruments in the form of Senior Unsecured Notes (the \"Notes\") by its subsidiary Aerovias de Mexico, S.A. de C.V. for US$400 million dollars, offered in the United States of America under Rule 144 A","img":"\"https://newsroom.aviator.aero/content/images/2020/02/Aerom-xico-_Boeing_787-8-_XA-AMX_-_NRT.jpg\" ","link":"https://newsroom.aviator.aero/aeromexico-completes-successful-unsecured-senior-notes-issuance-in-international-markets/","source":"Aviator-aero"},{"index":3,"title":"LATAM to leave oneworld effective 1 May 2020","description":"LATAM Airlines Group will end its membership in the oneworld® alliance effective 1 May 2020, following the group’s decision to leave the alliance.oneworld benefits for LATAM customers will be offered on oneworld flights up to and including 30 April 2020. LATAM Pass members will not","img":"\"https://newsroom.aviator.aero/content/images/2020/02/1280px-LATAM_Chile_Boeing_787-9_Dreamliner_-CC-BGD-_coming_in_from_Madrid_-LEMD-_@_Frankfurt_International_-EDDF-.jpg\" ","link":"https://newsroom.aviator.aero/latam-to-leave-oneworld-effective-1-may-2020/","source":"Aviator-aero"},{"index":4,"title":"Airbus reaches agreements with French, U.K. and U.S. authorities","description":"These agreements conclude investigations by authorities into the CompanyThis outcome is the result of reporting, cooperation and new compliance standards at AirbusAirbus is determined to conduct business with integrityAmsterdam, 31 January 2020 - Airbus has reached final agreements with the French Parquet National Financier (PNF), the U.","img":"\"https://newsroom.aviator.aero/content/images/2020/01/1280px-EGLF_-_Airbus_A220-300_-_C-FFDO_-42631601965-.jpg\" ","link":"https://newsroom.aviator.aero/airbus-reaches-agreements-with-french-u-k-and-u-s-authorities/","source":"Aviator-aero"},{"index":5,"title":"All Nippon Airways And Singapore Airlines Deepen Partnership With Joint Venture Agreement","description":"·         Strategic partnership aimed at providing customers with enhanced flight connectivity and access to a wider network.·         New agreement between the Star Alliance carriers will boost the Singapore and Tokyo air hubs through increased passenger traffic.TOKYO, Jan. 31, 2020 – All Nippon Airways (ANA), Japan’s largest and 5-star airline for","img":"\"https://newsroom.aviator.aero/content/images/2020/01/All_Nippon_Airways-_B777-200-_JA744A_-24101911221-.jpg\" ","link":"https://newsroom.aviator.aero/all-nippon-airways-and-singapore-airlines-deepen-partnership-with-joint-venture-agreement/","source":"Aviator-aero"},{"index":6,"title":"Oriole plans to become Jamaica's newest airline","description":"Oriole Limited plans to become the newest airline in Jamaica. The start-up carrier plans to launch LCC operations in March 2021, flying domestically and across the Caribbean.Chairman Aloun Ndombet-Assamba says the comapny is backed by investors from Jamaica and Europe, with veteran Keith Kerr joining the company as project","img":"\"https://newsroom.aviator.aero/content/images/2020/01/1200px-Flag_of_Jamaica_01.jpg\" ","link":"https://newsroom.aviator.aero/oriole-plans-to-become-jamaicas-newest-airline/","source":"Aviator-aero"},{"index":7,"title":"Moody's downgrades Boeing's senior unsecured rating to Baa1; keeps review open on uncertain timing of MAX's return to service","description":"New York, January 30, 2020 -- Moody's Investors Service, Inc. (\"Moody's\") downgraded its senior unsecured debt ratings for The Boeing Company and of subsidiary, Boeing Capital Corporation, to Baa1 from A3. These ratings remain on review for downgrade. Moody's also affirmed the Prime-2 short-term rating, which is not on review.","img":"\"https://newsroom.aviator.aero/content/images/2020/01/1280px-Boeing-_N7379E-_Boeing_737-9_MAX_-cropped-.jpg\" ","link":"https://newsroom.aviator.aero/moodys-downgrades-boeings-senior-unsecured-rating-to-baa1-keeps-review-open-on-uncertain-timing-of-maxs-return-to-service/","source":"Aviator-aero"},{"index":8,"title":"Aergo Capital announces the acquisition of one (1) Airbus A321 aircraft","description":"31 January 2020 – Dublin, Ireland: Aergo Capital Limited (“Aergo”) has completed the acquisition of one (1) 2012 Vintage Airbus A321-200 aircraft bearing manufacturers serial number 5271 from AviaAM Leasing (“AviaAM”). The aircraft was sold subject to the existing operating lease with Bamboo Airways.Fred Browne, Chief Executive Officer of Aergo,","img":"\"https://newsroom.aviator.aero/content/images/2020/01/Bamboo_Airways_Airbus_A321-200_NEO_VN-A590_-49006572742-.jpg\" ","link":"https://newsroom.aviator.aero/aergo-capital-announces-the-acquisition-of-one-1-airbus-a321-aircraft/","source":"Aviator-aero"},{"index":9,"title":"Finnair cancels all flights to mainland China between February 6 and February 29, 2020, customers to be flown home before that","description":"The health and wellbeing of customers and personnel is a top priority for Finnair. Following a thorough analysis of all currently available information on the coronavirus and its impacts on air travel to and from China, Finnair has decided to:• cancel all its flights to mainland China between February 6","img":"\"https://newsroom.aviator.aero/content/images/2020/01/1280px-Finnair_A330-300.JPG\" ","link":"https://newsroom.aviator.aero/finnair-cancels-all-flights-to-mainland-china-between-february-6-and-february-29-2020-customers-to-be-flown-home-before-that/","source":"Aviator-aero"},{"index":10,"title":"Air Serbia Establishes Flights From Kraljevo To Thessaloniki","description":"Air Serbia will introduce seasonal flights between Kraljevo and Thessaloniki in March 2020. The national airline will fly from Morava Airport to the second largest city in Greece three times a week, on Tuesdays, Thursdays and Saturdays. Tickets are already on sale.“With the introduction of a new route from","img":"\"https://newsroom.aviator.aero/content/images/2020/01/Air-Serbia-Thessaloniki-flights.jpg\" ","link":"https://newsroom.aviator.aero/air-serbia-establishes-flights-from-kraljevo-to-thessaloniki/","source":"Aviator-aero"},{"index":11,"title":"Vietnam Airlines and Jetstar Pacific Alter Operational Plan Regarding Flights Between Vietnam and China","description":"Hanoi, 31 January 2020 – Amidst the outbreak of the novel coronavirus (2019-nCoV), Vietnam Airlines and Jetstar Pacific are adjusting their operational plan regarding flight routes between Vietnam and China in an effort to curb the spread of 2019-nCoV, as well as the potential health risks posed to passengers and flight","img":"\"https://newsroom.aviator.aero/content/images/2020/01/Photo-2.jpg\" ","link":"https://newsroom.aviator.aero/vietnam-airlines-and-jetstar-pacific-alter-operational-plan-regarding-flights-between-vietnam-and-china/","source":"Aviator-aero"},{"index":12,"title":"WestJet welcomes Angela Avery as Executive Vice President, General Counsel and Corporate Secretary","description":"WestJet today announced that Angela Avery will be joining the airline as Executive Vice President, General Counsel and Corporate Secretary starting February 17, 2020.Reporting to Ed Sims, WestJet President and CEO, Angela will be responsible for all aspects of WestJet's legal and compliance functions. In addition, she will play","img":"\"https://newsroom.aviator.aero/content/images/2020/01/Boeing_737-800_-WestJet-_-8454245371--1.jpg\" ","link":"https://newsroom.aviator.aero/westjet-welcomes-angela-avery-as-executive-vice-president-general-counsel-and-corporate-secretary/","source":"Aviator-aero"},{"index":13,"title":"Hawaiian Holdings Reports 2019 Fourth Quarter and Full Year Financial Results","description":"Hawaiian Holdings, Inc. (NASDAQ: HA) (the \"Company\"), parent company of Hawaiian Airlines, Inc. (\"Hawaiian\"), today reported its financial results for the fourth quarter and full year 2019.\"Hawaiian delivered another year of strong financial results in 2019, despite the heightened competitive capacity environment we faced throughout the year,\" said Peter","img":"\"https://newsroom.aviator.aero/content/images/2020/01/A350-800_HAWAIIAN_AIRLINES.jpg\" ","link":"https://newsroom.aviator.aero/hawaiian-holdings-reports-2019-fourth-quarter-and-full-year-financial-results/","source":"Aviator-aero"},{"index":14,"title":"Killick Aerospace Group Appoints Bill Molloy as New COO","description":"The Killick Aerospace Group, a leading provider of commercial and business aircraft parts and engine solutions, announced today that aerospace industry veteran, Bill Molloy has been appointed Chief Operating Officer, a new position within Killick.As COO, Molloy will be responsible for driving sales growth in all areas of Killick's","img":"\"https://newsroom.aviator.aero/content/images/2020/01/killick.png\" ","link":"https://newsroom.aviator.aero/killick-aerospace-group-appoints-bill-molloy-as-new-coo/","source":"Aviator-aero"},{"index":368,"title":"Royal Jordanian 787 undergoes extensive coronavirus decontamination","description":"Royal Jordanian has illustrated the extent of decontamination and sterilisation measures being undertaken on board aircraft aimed at preventing further spread of the coronavirus which has badly disrupted services to China.  The airline has shown the procedures carried out on one of its Boeing 787-8s which had conducted a ...","img":"https://d3lcr32v2pp4l1.cloudfront.net/Pictures/100x67//1/3/6/67136_rjcockpit_591293.jpg","link":"https://www.flightglobal.com/news/royal-jordanian-787-undergoes-extensive-coronavirus-decontamination/136489.article","source":"Flightglobal"},{"index":369,"title":"Airbus put potential damage from bribery conviction at €200bn","description":"Airbus analysis estimated that the damage impact from a criminal conviction arising from bribery charges levelled against the company could have reached €200 billion across its commercial aircraft, defence and helicopter divisions.  The airframer has agreed to pay a €3.6 billion ($4 billion) fine to settle the case under ...","img":"https://d3lcr32v2pp4l1.cloudfront.net/Pictures/100x67//1/3/5/67135_a350_667850.jpg","link":"https://www.flightglobal.com/news/airbus-put-potential-damage-from-bribery-conviction-at-200bn/136488.article","source":"Flightglobal"},{"index":370,"title":"Chinese carriers cut capacity over global travel restrictions","description":"Airlines in China have begun cancelling flights to a growing list of international destinations, in light of travel restrictions imposed following a novel coronavirus outbreak.   As the number of confirmed cases in China and around the world continues to climb, countries like Singapore, Vietnam, the Philippines and the ...","img":"https://d3lcr32v2pp4l1.cloudfront.net/Pictures/100x67//1/3/4/67134_air-china-777-300er_65302.jpg","link":"https://www.flightglobal.com/airlines/chinese-carriers-cut-capacity-over-global-travel-restrictions/136487.article","source":"Flightglobal"},{"index":371,"title":"South African president refers SAA allegations to special investigators","description":"South African president Cyril Ramaphosa has authorised investigators to probe allegations of maladministration, corruption or unlawful conduct at South African Airways dating back to at least 2002.  Ramaphosa’s order to refer the allegations to a special investigation unit has been disclosed in a declaration in the official government gazette. ...","img":"https://d3lcr32v2pp4l1.cloudfront.net/Pictures/100x67//1/3/3/67133_saatail_234500.jpg","link":"https://www.flightglobal.com/news/south-african-president-refers-saa-allegations-to-special-investigators/136486.article","source":"Flightglobal"}]

   mockdata
 end