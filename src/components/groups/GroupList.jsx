import PropTypes from "prop-types";
import GroupCard from "./GroupCard";

const GroupList = ({ groups, onGroupsUpdate }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {groups.map((group) => (
        <GroupCard
          key={group._id}
          group={group}
          onGroupUpdate={onGroupsUpdate}
        />
      ))}
      {groups.length === 0 && (
        <div className="col-span-full text-center py-12">
          <p className="text-neutral-400">
            No groups found. Create one to get started!
          </p>
        </div>
      )}
    </div>
  );
};

GroupList.propTypes = {
  groups: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      maxSize: PropTypes.number.isRequired,
      members: PropTypes.array,
      goals: PropTypes.array,
      completionRate: PropTypes.number,
      createdAt: PropTypes.string.isRequired,
    }),
  ).isRequired,
  onGroupsUpdate: PropTypes.func.isRequired,
};

export default GroupList;
