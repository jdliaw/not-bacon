class Style < ActiveRecord::Base
  serialize :data
  belongs_to :publisher
end
