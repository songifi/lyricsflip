const asyncHandler = require("express-async-handler");
const Song = require("../../models/Song");
const Admin = require("../../models/Admin");

//@Desc Create Song
//@Route POST api/v1/song
//@Access private
exports.createSubject = asyncHandler(async (req, res) => {
  const {
    title,
    artist,
    album,
    genre,
    decade,
    lyricsSnippet,
    fullLyrics,
    releaseYear,
    difficultyLevel,
    createdBy,
  } = req.body;

  //Check if the song already exist
  const songFound = await Song.findOne({ title });

  if (songFound) {
    throw new Error("Song already exist");
  }
  //Create
  const songCreated = await Song.create({
    title,
    artist,
    album,
    genre,
    decade,
    lyricsSnippet,
    fullLyrics,
    releaseYear,
    difficultyLevel,
    createdBy: req.userAuth._id,
  });

  res.status(201).json({
    status: "success",
    message: "Song created successfully",
    data: songCreated,
  });
});

//@Desc Get All Song
//@Route GET api/v1/songs
//@Access private
exports.getAllSubjects = asyncHandler(async (req, res) => {
  const songs = await Song.find();

  if (!songs) {
    throw new Error(`No songs found`);
  } else {
    res.status(200).json({
      status: "success",
      data: songs,
      message: "songs has been fetched successfully",
    });
  }
});

//@Desc get Single Song
//@Route GET api/v1/Song/:id
//@Access private
exports.getSingleSong = asyncHandler(async (req, res) => {
  const song = await Song.findById(req.params.id);

  if (!song) {
    throw new Error(`No Song Found`);
  } else {
    res.status(200).json({
      status: "success",
      data: song,
      message: "Song has been fetched successfully",
    });
  }
});

//@Desc Update Song
//@Route PUT api/v1/songs/:id
//@Access private
exports.updateSong = asyncHandler(async (req, res) => {
  const {
    title,
    artist,
    album,
    genre,
    decade,
    lyricsSnippet,
    fullLyrics,
    releaseYear,
    difficultyLevel,
  } = req.body;

  //check if name exist
  const songFound = await Song.findOne({ name });

  if (songFound) {
    throw new Error("song Already exist");
  }

  const song = await Song.findByIdAndUpdate(
    req.params.id,
    {
      title,
      artist,
      album,
      genre,
      decade,
      lyricsSnippet,
      fullLyrics,
      releaseYear,
      difficultyLevel,
      createdBy: req.userAuth._id,
    },
    { new: true, runValidators: true }
  );

  
    res.status(200).json({
      status: "success",
      data: song,
      message: "Song has been updated successfully",
    });
  
});

//@Desc Delete Song
//@Route DELETE api/v1/songs/:id
//@Access private
exports.deleteSong = asyncHandler(async (req, res) => {
  await Song.findByIdAndDelete(req.params.id);

  res.status(200).json({
    status: "success",
    message: "Song has been deleted successfully",
  });
});
