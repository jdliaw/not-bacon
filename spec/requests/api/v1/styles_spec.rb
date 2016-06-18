require 'rails_helper'

RSpec.describe "api/v1/styles", type: :request do
  describe '#create' do
    it 'creates a style' do
      publisher = create(:publisher)
      headers = {
        "Content-Type" => "application/vnd.api+json",
        "ACCEPT" => "application/json"
      }

      payload = { data: { type:'styles', attributes: { 'publisher-id' => publisher.id, 'style-attributes' => { hey: 'world' } } } }.to_json

      post api_v1_styles_path, payload, headers

      expect(response).to have_http_status(:created)
      expect(Style.first.style_attributes).to eq({ hey: 'world' })
    end
  end
end
