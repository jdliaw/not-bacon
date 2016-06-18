class Style < ActiveRecord::Base
  serialize :style_attributes
  belongs_to :publisher
end
