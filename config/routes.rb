Rails.application.routes.draw do
  root 'humes#start'

  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      jsonapi_resources :styles, only: [:index, :create, :show]
    end
  end
end
