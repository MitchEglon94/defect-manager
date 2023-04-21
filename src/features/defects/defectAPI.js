import { v4 as uuidv4 } from "uuid";

export const activeDefects = [
  {
    defectId: uuidv4(),
    title: "light out",
    location: "galley",
    description: "Lamp above centre hob broken",
    dateReported: Date.now(),
    assignedTo: 1,
    registeredBy: 2,
    isComplete: false,
  },
  {
    defectId: uuidv4(),
    title: "line snapped",
    location: "aft deck",
    description: "forward leading spring snapped at cleat",
    dateReported: Date.now(),
    assignedTo: 2,
    registeredBy: 1,
    isComplete: true,
  },
  {
    defectId: uuidv4(),
    title: "socket off",
    location: "cabin 2",
    description: "bedside socket not working",
    dateReported: Date.now(),
    assignedTo: 1,
    registeredBy: 3,
    isComplete: false,
  },
  {
    defectId: uuidv4(),
    title: "radar off",
    location: "bridge",
    description: "X-band portside magnetron fault warning",
    dateReported: Date.now(),
    assignedTo: 1,
    registeredBy: 2,
    isComplete: false,
  },
];

export const completedDefects = [
  // {
  //   defectId: 2,
  //   title: "socket broke",
  //   location: "lounge",
  //   description: "Sofa portside socket hanging off",
  //   assignedTo: 1,
  //   registeredBy: 2,
  //   isComplete: true,
  // },
];
