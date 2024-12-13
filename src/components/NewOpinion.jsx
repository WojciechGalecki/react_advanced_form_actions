import { use } from "react";

import { useActionState } from "react";
import { isNotEmpty } from "../util/validation";
import { OpinionsContext } from "../store/opinions-context";
import Submit from "./Submit";

export function NewOpinion() {
  const { addOpinion } = use(OpinionsContext);

  async function shareOpinionAction(prevState, formData) {
    const userName = formData.get("userName");
    const title = formData.get("title");
    const body = formData.get("body");

    let errors = [];

    if (!isNotEmpty(userName)) {
      errors.push("Name must not be empty!");
    }

    if (!isNotEmpty(title)) {
      errors.push("Title must not be empty!");
    }

    if (!isNotEmpty(body)) {
      errors.push("Opinion must not be empty!");
    }

    if (errors.length > 0) {
      return {
        errors,
        values: {
          userName,
          title,
          body,
        },
      };
    }

    await addOpinion({ userName, title, body });

    return {
      errors: null,
    };
  }

  const [formState, formAction] = useActionState(shareOpinionAction, {
    errors: null,
  });

  return (
    <div id="new-opinion">
      <h2>Share your opinion!</h2>
      <form action={formAction}>
        <div className="control-row">
          <p className="control">
            <label htmlFor="userName">Your Name</label>
            <input
              type="text"
              id="userName"
              name="userName"
              defaultValue={formState.values?.userName}
            />
          </p>

          <p className="control">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              defaultValue={formState.values?.title}
            />
          </p>
        </div>
        <p className="control">
          <label htmlFor="body">Your Opinion</label>
          <textarea
            id="body"
            name="body"
            rows={5}
            defaultValue={formState.values?.body}
          ></textarea>
        </p>

        {formState.errors && (
          <ul className="errors">
            {formState.errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        )}

       <Submit />
      </form>
    </div>
  );
}
