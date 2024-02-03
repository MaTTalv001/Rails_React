require 'faraday'
require 'json'

class AnnictApiServiceCast
  def initialize
    @base_url = "https://api.annict.com/v1/casts"
    @access_token = ENV["ANNICT_ACCESS_TOKEN"]
  end

  def fetch_cast_data(works)
    all_casts_data = []
    unique_work_ids = works.map { |work| work[:annict_id] }
    unique_work_ids.each do |work_annict_id|
      puts "Fetching cast data for work id: #{work_annict_id}"
      response = Faraday.get("#{@base_url}", {
        fields: 'id,sort_number,work.id,character.name,character.name_kana,person.id,person.name',
        per_page: 25,
        filter_work_id: work_annict_id,
        access_token: @access_token
      })
      data = JSON.parse(response.body)
      next unless data["casts"].is_a?(Array)

      data["casts"].each do |cast|
        cast_entry = {
          work_id: work_annict_id,
          cast_id: cast["id"],
          sort_number: cast["sort_number"],
          person_id: cast["person"]["id"],
          person_name: cast["person"]["name"],
          character_name: cast["character"]["name"],
          character_name_kana: cast["character"]["name_kana"]
        }

        # Append the cast entry to the all_casts_data array
        all_casts_data << cast_entry
      end
    end

    # Return the array containing all the casts data
    all_casts_data
  end
end