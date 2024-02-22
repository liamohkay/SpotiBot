<div id="selected-playlist" className="flex">
  <div id="selected-playlist-header" className="flex">
    <RunBot subreddits={selected.subreddits} />
    {!selectedInfo.images || selectedInfo.images.length === 0
      ? <img src="https://i1.wp.com/hertrack.com/wp-content/uploads/2018/10/no-image.jpg?w=1000&ssl=1"/>
      : <img src={selectedInfo.images[1].url} />
    }
    <div id="selected-playlist-info" className="flex">
      <div>
        <h1>{selected.name}</h1>
        <div>Followers: {selectedInfo.followers.total}</div>
        <p>{selectedInfo.description}</p>
      </div>
    </div>
</div>