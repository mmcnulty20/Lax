# == Route Map
#
#                         Prefix Verb   URI Pattern                                                                              Controller#Action
#                           root GET    /                                                                                        static_pages#root
#                                       /cable                                                                                   #<ActionCable::Server::Base:0x00007f95c2738a70 @mutex=#<Monitor:0x00007f95c2738a48 @mon_owner=nil, @mon_count=0, @mon_mutex=#<Thread::Mutex:0x00007f95c27389a8>>, @pubsub=nil, @worker_pool=nil, @event_loop=nil, @remote_connections=nil>
#                    api_message GET    /api/messages/:id(.:format)                                                              api/messages#show {:format=>:json}
#                                PATCH  /api/messages/:id(.:format)                                                              api/messages#update {:format=>:json}
#                                PUT    /api/messages/:id(.:format)                                                              api/messages#update {:format=>:json}
#                                DELETE /api/messages/:id(.:format)                                                              api/messages#destroy {:format=>:json}
#              api_user_channels GET    /api/users/:user_id/channels(.:format)                                                   api/channels#index {:format=>:json}
#         email_in_use_api_users GET    /api/users/email_in_use(.:format)                                                        api/users#email_in_use {:format=>:json}
#                      api_users GET    /api/users(.:format)                                                                     api/users#index {:format=>:json}
#                                POST   /api/users(.:format)                                                                     api/users#create {:format=>:json}
#                       api_user GET    /api/users/:id(.:format)                                                                 api/users#show {:format=>:json}
#                                PATCH  /api/users/:id(.:format)                                                                 api/users#update {:format=>:json}
#                                PUT    /api/users/:id(.:format)                                                                 api/users#update {:format=>:json}
#                                DELETE /api/users/:id(.:format)                                                                 api/users#destroy {:format=>:json}
#           api_channel_messages GET    /api/channels/:channel_id/messages(.:format)                                             api/messages#index {:format=>:json}
#                                POST   /api/channels/:channel_id/messages(.:format)                                             api/messages#create {:format=>:json}
#     already_taken_api_channels GET    /api/channels/already_taken(.:format)                                                    api/channels#already_taken {:format=>:json}
#        api_channel_memberships POST   /api/channels/:channel_id/memberships(.:format)                                          api/memberships#create {:format=>:json}
#         api_channel_membership DELETE /api/channels/:channel_id/memberships/:id(.:format)                                      api/memberships#destroy {:format=>:json}
#                   api_channels GET    /api/channels(.:format)                                                                  api/channels#index {:format=>:json}
#                                POST   /api/channels(.:format)                                                                  api/channels#create {:format=>:json}
#                    api_channel GET    /api/channels/:id(.:format)                                                              api/channels#show {:format=>:json}
#                                PATCH  /api/channels/:id(.:format)                                                              api/channels#update {:format=>:json}
#                                PUT    /api/channels/:id(.:format)                                                              api/channels#update {:format=>:json}
#                                DELETE /api/channels/:id(.:format)                                                              api/channels#destroy {:format=>:json}
#    api_direct_message_messages POST   /api/direct_messages/:direct_message_id/messages(.:format)                               api/messages#create {:format=>:json}
# api_direct_message_memberships POST   /api/direct_messages/:direct_message_id/memberships(.:format)                            api/memberships#create {:format=>:json}
#  api_direct_message_membership DELETE /api/direct_messages/:direct_message_id/memberships/:id(.:format)                        api/memberships#destroy {:format=>:json}
#            api_direct_messages GET    /api/direct_messages(.:format)                                                           api/direct_messages#index {:format=>:json}
#                                POST   /api/direct_messages(.:format)                                                           api/direct_messages#create {:format=>:json}
#             api_direct_message GET    /api/direct_messages/:id(.:format)                                                       api/direct_messages#show {:format=>:json}
#                    api_session DELETE /api/session(.:format)                                                                   api/sessions#destroy {:format=>:json}
#                                POST   /api/session(.:format)                                                                   api/sessions#create {:format=>:json}
#             rails_service_blob GET    /rails/active_storage/blobs/:signed_id/*filename(.:format)                               active_storage/blobs#show
#      rails_blob_representation GET    /rails/active_storage/representations/:signed_blob_id/:variation_key/*filename(.:format) active_storage/representations#show
#             rails_disk_service GET    /rails/active_storage/disk/:encoded_key/*filename(.:format)                              active_storage/disk#show
#      update_rails_disk_service PUT    /rails/active_storage/disk/:encoded_token(.:format)                                      active_storage/disk#update
#           rails_direct_uploads POST   /rails/active_storage/direct_uploads(.:format)                                           active_storage/direct_uploads#create

Rails.application.routes.draw do

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: 'static_pages#root'
  
  mount ActionCable.server, at: '/cable'

  namespace :api, defaults: { format: :json } do 
    resources :messages, only: [:show, :update, :destroy]
    resources :users, only: [:index, :show, :create, :update, :destroy] do
        resources :channels, only: [:index]
        collection do
            get :email_in_use
        end
    end
    
    resources :channels, only: [:index, :show, :create, :update, :destroy] do
        resources :messages, only: [:index, :create]
        collection do
            get :already_taken
        end
        resources :memberships, only: [:create, :destroy]
    end

    resources :direct_messages, only: [:index, :show, :create] do
      resources :messages, only: [:index, :create]
      resources :memberships, only: [:create, :destroy]
    end

    resource :session, only: [:create, :destroy]
  end
end
