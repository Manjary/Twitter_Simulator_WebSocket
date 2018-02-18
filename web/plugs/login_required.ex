defmodule App.LoginRequired do
  @moduledoc """
  The responsibility of this plug is ensure that the user is authenticated,
  otherwise the user is redirected to login page.
  """
  use App.Web, :controller

  alias App.User

  def init(default), do: default

  def call(conn, _default) do
    case User.get_current_user conn do
      nil ->
        conn
        |> put_flash(:info, "You must be logged in.")
        |> redirect(to: login_path(conn, :index))
        |> halt
      current_user ->
        assign conn, :current_user, current_user
    end
  end
end
