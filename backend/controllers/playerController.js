const Player = require("../../models/Academic/Player");
const AsyncHandler = require("express-async-handler");
const { hashPassword, isPassMatched } = require("../../utils/helpers");
const generateToken = require("../../utils/generateToken");

//@Desc Admin Register Player
//@Route POST api/v1/player/register
//@Access public - 
exports.registerPlayer = AsyncHandler(async (req, res) => {
  const { email, username, password } = req.body;

  //check if player already exist
  const playerFound = await Player.findOne({ email });
  if (playerFound) {
    throw new Error("Player Already Registered");
  }

  //Hash password
  const hashedPassword = await hashPassword(password);

  //Create
  const playerCreated = await Player.create({
      email,
      username,
    password: hashedPassword,
  });

  //send data
  res.status(201).json({
    status: "success",
    data: playerCreated,
    message: "Player Created successfully",
  });
});

//@Desc log in a player
//@Route POST api/v1/players/login
//@Access Public
exports.loginPlayer = AsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await Player.findOne({ email });
  if (!user) {
    return res.json({ message: "Invalid Login Credentials" });
  }

  //Verifying the password
  const isMatched = await isPassMatched(password, user.password);

  if (!isMatched) {
    return res.json({ message: "Invalid Login Credentials" });
  } else {
    return res.status(200).json({
      data: {
        token: generateToken(user?._id),
        message: "Player Logged In Successfully",
      },
    });
  }
});

//@Desc Get Player Profile
//@Route GET api/v1/players/profile
//@Access private - player only
exports.getPlayerProfileController = AsyncHandler(async (req, res) => {
  const player = await Player.findById(req.userAuth._id).select(
    "-password -createdAt -updatedAt"
  );
  if (!player) {
    throw new Error("Player not found");
  } else {
    res.status(200).json({
      status: "success",
      data: player,
      message: "Player Profile Fetched Successfully",
    });
  }
});

//@Desc get all players
//@Route GET api/v1/players
//@Access Private - Admin Only
exports.getAllPlayersAdmin = AsyncHandler(async (req, res) => {
  const player = await Player.find();

  res.status(200).json({
    status: "success",
    message: "Player Fetched Successfully",
    data: player,
  });
});

//@Desc Get Single Player
//@Route GET api/v1/players/:playerId/admin
//@Access private - Admin Only
exports.getSinglePlayerByAdminController = AsyncHandler(async (req, res) => {
  const playerId = req.params.playerId;
  const player = await Player.findById(playerId).select(
    "-password -createdAt -updatedAt"
  );

  if (!player) {
    throw new Error("player not found");
  } else {
    res.status(200).json({
      status: "success",
      data: player,
      message: "Admin Fetched Player Successfully",
    });
  }
});

//@Desc Player Update Player Profile
//@Route PUT api/v1/players/:sutudentId/update
//@Access private - Player only
exports.playerUpdateProfileController = AsyncHandler(async (req, res) => {
  const { email, username, password } = req.body;

  const emailExist = await Player.findOne({ email });

  if (emailExist) {
    throw new Error(`User email already exists`);
  }

  // Check if user is updating password
  if (password) {
    //Update Player
    const player = await Player.findByIdAndUpdate(
      req.userAuth._id,
      {
          email,
          username,
        password: await hashPassword(password),
      },
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      status: "success",
      data: player,
      message: "Player Profile Updated Successfully",
    });
  } else {
    //Update Player
    const player = await Teacher.findByIdAndUpdate(
      req.userAuth._id,
      {
        email,
          username
      },
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      status: "success",
      data: player,
      message: "Player Profile Updated Successfully",
    });
  }
});

//@Desc Admin Update player Profile
//@Route PUT api/v1/players/:playerId/update/admin
//@Access private - Admin only
exports.adminUpdatePlayerController = AsyncHandler(async (req, res) => {
  const { program, classLevel, academicYear, name, email, prefectName, isSuspended, isWithdrawn } =
    req.body;

  //find player by ID
  const playerFound = await Player.findById(req.params.playerId);

  if (!playerFound) {
    throw new Error(`player not found`);
  }

  //Assign a program
  if (program) {
    playerFound.program = program;
    await playerFound.save();

    res.status(200).json({
      status: "success",
      data: playerFound,
      message: "player Profile Updated Successfully",
    });
  }

  //Update
  const playerUpdated = await Player.findByIdAndUpdate(
    req.params.playerid,
    {
      $set: {
        program,
        academicYear,
        name,
        email,
        prefectName,
        isSuspended, isWithdrawn
      },
      $addToSet: {
        classLevel,
      },
    },
    {
      new: true,
    }
  );

  //send response
  res.status(200).json({
    success: true,
    data: playerUpdated,
    message: playerUpdated,
  });
});