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

  describe '#show' do
    it 'displays the style' do
      publisher = create(:publisher)
      publisher.styles.create(style_attributes: { hello: 'world'})
      style_two = publisher.styles.create(style_attributes: { goodbye: 'world'})

      get api_v1_styles_path(style_two)

      response_body = JSON.parse(response.body)
      attributes = response_body['data'].last['attributes']

      expect(response).to have_http_status(200)
      expect(attributes['style-attributes']).to eq({ 'goodbye' => 'world' })
    end
  end
end
