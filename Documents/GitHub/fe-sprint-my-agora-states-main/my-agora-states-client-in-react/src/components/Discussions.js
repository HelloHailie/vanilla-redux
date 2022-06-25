import { Discussion } from "./Discussion";

export const Discussions = ({ discussions }) => {
  return (
    <section className="discussion__wrapper">
      <ul className="discussions__container">
        {discussions.map((discussion) => {
          return (
            <Discussion
              key={discussion.id}
              discussion={discussion}
            ></Discussion>
          );
        })}
      </ul>
    </section>
  );
};
