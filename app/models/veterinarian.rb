class Veterinarian < ActiveRecord::Base
  mount_uploader :avatar, AvatarUploader


  validates_processing_of :avatar
  validate :avatar_size_validation







private
  def avatar_size_validation
    errors[:avatar] << "should be less than 500KB" if avatar.size > 0.5.megabytes
  end
end
