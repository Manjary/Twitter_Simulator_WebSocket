defmodule App.RoomChannel do
  use App.Web, :channel
  alias App.Presence

  def join("room:Tweeter", _, socket) do
    IO.puts"Reached!"
    send self(), :after_join
    {:ok, socket}
  end

  def handle_info(:after_join, socket) do
    Presence.track(socket, socket.assigns.user, %{
      online_at: :os.system_time(:milli_seconds)
    })
    IO.puts("socket is #{inspect socket}")
    push socket, "presence_state", Presence.list(socket)
    IO.puts " connected"
    {:noreply, socket}
  end

  def handle_in("message:new", message, socket) do
    IO.puts("socket is #{inspect socket}")
    broadcast! socket, "message:new", %{
      user: socket.assigns.user,
      body: message,
      timestamp: :os.system_time(:milli_seconds)
    }
    {:noreply, socket}
  end

end
