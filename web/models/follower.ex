defmodule App.Follower do
  use App.Web, :model

  alias App.User

  schema "followers" do
    belongs_to :user, User
    belongs_to :follower, User

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:user_id, :follower_id])
    |> unique_constraint(:follower_pair, name: :followers_user_id_follower_id_index)
  end
end
